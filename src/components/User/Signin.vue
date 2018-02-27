<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <app-alert v-if="error" @dismissed="onDismissed" :text="error.message"></app-alert>
        <v-card class="elevation-12">
          <v-toolbar dark color="indigo">
            <v-toolbar-title>Sign In form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              @submit.prevent="onSignin"
              v-model="valid"
              ref="form"
              lazy-validation
            >
              <v-text-field
                id="email"
                prepend-icon="person"
                name="email"
                label="Mail"
                type="email"
                v-model="email"
                @keyup.enter.native="onSignin"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                @keyup.enter.native="onSignin"
                required
                :rules="[v => !!v || 'Password is required']"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              :loading="this.$store.getters.loading"
              @click="onSignin"
              color="primary"
            >
              SignIn
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: ''
    }),
    methods: {
      onSignin () {
        this.loading = true
        if (this.$refs.form.validate()) {
          this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
        } else {
          this.loading = false
        }
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      }
      // Produces an error putting the loading state data as a computed property
    }
  }
</script>
