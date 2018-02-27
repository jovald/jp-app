import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMenus: [
      {
        id: '1',
        titulo: 'Caldito',
        fecha: '2018-2-21',
        tipo: 'cena'
      },
      {
        id: '2',
        titulo: 'Fideos con salsa',
        fecha: '2018-2-21',
        tipo: 'almuerzo'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
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
    createMenu ({commit}, payload) {
      const menu = {
        id: 'adfa3edwd-23',
        fecha: payload.fecha,
        tipo: payload.tipo,
        titulo: payload.titulo
      }
      // Reach to firebase and store it
      commit('createMenu', menu)
    },
    deleteMenu ({commit}, payload) {
      commit('deleteMenu', payload)
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
              registeredMenus: []
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
            const newUser = {
              id: user.uid,
              registeredMenus: []
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
