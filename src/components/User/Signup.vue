<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="indigo">
            <v-toolbar-title>Sign Up form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              @submit.prevent="onSignup"
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
                @keyup.enter.native="onSignup"
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
                @keyup.enter.native="onSignup"
                required
                :rules="[v => !!v || 'Password is required']"
                ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                @keyup.enter.native="onSignup"
                :rules="[comparePasswords]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              :loading="loading"
              @click="onSignup"
              color="primary"
            >
              SignUp
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
      password: '',
      confirmPassword: '',
      loading: false
    }),
    methods: {
      onSignup () {
        this.loading = true
        if (this.$refs.form.validate()) {
          this.$store.dispatch('signUserUp', { email: this.email, password: this.password })
        } else {
          this.loading = false
        }
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
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : true
      },
      user () {
        return this.$store.getters.user
      }
    }
  }
</script>
