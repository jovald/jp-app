import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Menus from '@/components/Menu/Menus'
import Menu from '@/components/Menu/Menu'

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
      name: 'Menu',
      component: Menu
    }
  ]
})
