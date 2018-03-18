import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMenus: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    registerUserForMenu (state, payload) {
      const id = payload.id
      if (state.user.registeredMenus.findIndex(menu => menu.id === id) >= 0) {
        return
      }
      state.user.registeredMenus.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMenu (state, payload) {
      const registeredMenus = state.user.registeredMenus
      registeredMenus.splice(registeredMenus.findIndex(menu => menu.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedMenus (state, payload) {
      state.loadedMenus = payload
    },
    createMenu (state, payload) {
      state.loadedMenus.push(payload)
    },
    deleteMenu (state, payload) {
      state.loadedMenus.splice(state.loadedMenus.indexOf(payload), 1)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    registerUserForMenu ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
      .push(payload)
      .then((data) => {
        commit('setLoading', false)
        commit('registerUserForMenu', {id: payload, fbKey: data.key})
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    unregisterUserFromMenu ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
      .remove()
      .then(() => {
        commit('setLoading', false)
        commit('unregisterUserFromMenu', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    loadMenus ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('menus').once('value')
        .then((data) => {
          const menus = []
          const obj = data.val()
          for (let key in obj) {
            menus.push({
              id: key,
              titulo: obj[key].titulo,
              tipo: obj[key].tipo,
              fecha: obj[key].fecha
            })
          }
          commit('setLoadedMenus', menus)
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createMenu ({commit}, payload) {
      commit('setLoading', true)
      const menu = {
        fecha: payload.fecha,
        tipo: payload.tipo,
        titulo: payload.titulo
      }
      firebase.database().ref('menus').push(menu)
        .then((data) => {
          const key = data.key
          commit('createMenu', {
            ...menu,
            id: key
          })
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
      // Reach to firebase and store it
    },
    deleteMenu ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('menus').child(payload.id).remove()
        .then((data) => {
          commit('deleteMenu', payload)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              email: user.email,
              registeredMenus: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            console.log(user.email)
            const newUser = {
              id: user.uid,
              email: user.email,
              registeredMenus: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', { id: payload.uid, email: payload.email, registeredMenus: [], fbKeys: {} })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
      .then(data => {
        const dataPairs = data.val()
        let registeredMenus = []
        let swappedPairs = {}
        for (let key in dataPairs) {
          registeredMenus.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }
        const updatedUser = {
          id: getters.user.id,
          email: getters.user.email,
          registeredMenus: registeredMenus,
          fbKeys: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMenus (state) {
      return state.loadedMenus.sort((menuA, menuB) => {
        return menuA.fecha > menuB.fecha
      })
    },
    loadedMenu (state) {
      return (menuId) => {
        return state.loadedMenus.find((menu) => {
          return menu.id === menuId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
