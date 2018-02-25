import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Menus from '@/components/Menu/Menus'
import CreateMenu from '@/components/Menu/CreateMenu'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Register from '@/components/User/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/menus',
      name: 'Menus',
      component: Menus
    },
    {
      path: '/menu',
      name: 'CreateMenu',
      component: CreateMenu
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ],
  mode: 'history'
})
