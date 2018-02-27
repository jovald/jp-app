import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import AlertCmp from './components/Shared/Alert'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDO2bwxeFUn3y7yWv4MUMKKUmu1Ig0rUqw',
      authDomain: 'jp-app-c58c6.firebaseapp.com',
      databaseURL: 'https://jp-app-c58c6.firebaseio.com',
      projectId: 'jp-app-c58c6',
      storageBucket: 'jp-app-c58c6.appspot.com'
    })
    this.$store.dispatch('loadMenus')
  }
})
