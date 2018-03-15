<template>
  <v-app id="inspire">


    <v-navigation-drawer
      v-if="['Signup', 'Signin'].indexOf(this.$route.name) === -1"
      fixed
      v-model="drawer"
      app
    >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="/static/images/wappen.png" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ showUsername }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
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

    <v-toolbar
      color="indigo"
      dark
      fixed
      app
    >
      <v-toolbar-side-icon
        v-if="['Signup', 'Signin'].indexOf(this.$route.name) === -1"
        @click.stop="drawer = !drawer"
      >
      </v-toolbar-side-icon>
      <v-toolbar-title>RipuariApp</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left offset-y>
        <v-btn flat icon dark slot="activator">
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
          v-for="item in userMenuItems"
          :key="item.title"
          :to="item.link"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer color="indigo" app>
      <v-spacer></v-spacer>
      <span style="padding-right:10px"class="white--text">&copy; 2018 Burschenschaft Ripuaria</span>
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
    },
    computed: {
      userMenuItems () {
        let userMenuItems = [
          { icon: 'lock_open', title: 'SignIn', link: '/signin' },
          { icon: 'face', title: 'SignUp', link: '/signup' }
        ]
        if (this.userIsAuthenticated) {
          userMenuItems = [
            { icon: 'persona', title: 'Profile', link: '/perfil' }
          ]
        }
        return userMenuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      showUsername () {
        var name = this.$store.state.user.email.split('@')[0].split('.')[0]
        name = name.charAt(0).toUpperCase() + name.slice(1)
        var lastName = this.$store.state.user.email.split('@')[0].split('.')[1]
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
        return name + ' ' + lastName
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/signin')
      }
    }
  }
</script>
