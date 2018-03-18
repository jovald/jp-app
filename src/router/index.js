import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Menus from '@/components/Menu/Menus'
import CreateMenu from '@/components/Menu/CreateMenu'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import CookMenus from '@/components/Menu/CookMenus'
import AuthGuard from './auth-guard'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: AuthGuard
    },
    {
      path: '/menus',
      name: 'Menus',
      component: Menus,
      beforeEnter: AuthGuard
    },
    {
      path: '/menu',
      name: 'CreateMenu',
      component: CreateMenu,
      beforeEnter: AuthGuard
    },
    {
      path: '/cook',
      name: 'CookMenus',
      component: CookMenus,
      beforeEnter: AuthGuard
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
    }

  ],
  mode: 'history'
})
