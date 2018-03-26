import Vue from 'vue'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import AlertCmp from './components/Shared/Alert'
import RegisterDialog from './components/Menu/Registration/RegisterDialog.vue'

Vue.use(Vuetify)
Vue.use(VueLodash, lodash)

Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)
Vue.component('app-menu-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAGb5uJA9WNnmIm8TR5mx8CDYVHMU1qPyM',
      authDomain: 'ripuariapp.firebaseapp.com',
      databaseURL: 'https://ripuariapp.firebaseio.com',
      projectId: 'ripuariapp',
      storageBucket: 'ripuariapp.appspot.com'
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
  }
})
