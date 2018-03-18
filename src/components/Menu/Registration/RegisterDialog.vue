<template>
  <v-dialog width="350px" persistent v-model="registerDialog">
    <v-btn flat fab slot="activator">
      <v-icon v-if="!userIsRegistered" color="red darken-1">thumb_up</v-icon>
      <v-icon v-else color="green darken-1">thumb_down</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline" v-if="userIsRegistered">No almorzarás?</v-card-title>
            <v-card-title class="headline" v-else>Almorzarás?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>Siempre puedes cambiar tu decisión.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                flat
                @click="registerDialog = false">Cancelar</v-btn>
              <v-btn
                class="green--text darken-1"
                flat
                @click="onAgree(); registerDialog = false;" >Confirmar</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['menuId'],
    data () {
      return {
        registerDialog: false
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredMenus.findIndex(menuId => {
          return menuId === this.menuId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromMenu', this.menuId)
        } else {
          this.$store.dispatch('registerUserForMenu', this.menuId)
        }
      }
    }
  }
</script>
