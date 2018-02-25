import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMenus: [
      {
        id: '1',
        almuerzo: { titulo: 'Lentejas', imagen: '/static/images/almuerzo.jpg', activo: true },
        cena: { titulo: 'Pollo con arroz arabe', imagen: '/static/images/cena.jpg', activo: true },
        fecha: '2018-2-20'
      },
      {
        id: '2',
        almuerzo: { titulo: 'Fideos con salsa', imagen: '/static/images/almuerzo.jpg', activo: false },
        cena: { titulo: 'Caldito', imagen: '/static/images/cena.jpg', activo: false },
        fecha: '2018-2-21'
      }
    ],
    user: null
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
    }
  },
  actions: {
    createMenu ({commit}, payload) {
      const menu = {
        almuerzo: {
          titulo: payload.almuerzo.titulo,
          imagen: '/static/images/cena.jpg',
          activo: false
        },
        cena: {
          titulo: payload.cena.titulo,
          imagen: '/static/images/cena.jpg',
          activo: false
        },
        fecha: payload.fecha,
        id: 'sadfghdfgdhfg12'
      }
      // Reach to firebase and store it
      commit('createMenu', menu)
    },
    deleteMenu ({commit}, payload) {
      commit('deleteMenu', payload)
    },
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMenus: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMenus: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
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
    }
  }
})
