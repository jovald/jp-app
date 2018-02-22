<template>
  <v-app id="inspire">

    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>

        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title> {{ item.title }} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>RipuariApp</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      menuItems: [
        { icon: 'featured_play_list', title: 'Menú Semanal', link: '/menus' },
        { icon: 'work', title: 'Administrar Menús', link: '/menu' }
      ]
    }),
    props: {
      source: String
    }
  }
</script>
