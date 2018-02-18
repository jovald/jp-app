<template>

    <v-flex xs10 offset-xs1 >
      <v-card>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Almuerzo"
          v-model="almuerzo"
          :rules="almuerzoRules"
          required
        ></v-text-field>
        <v-text-field
          label="Cena"
          v-model="cena"
          :rules="cenaRules"
          required
        ></v-text-field>

        <v-date-picker
          full-width
          landscape
          class="mt-3"
          color="red darken-1"
          :first-day-of-week="1"
          locale="es-cl"
          v-model="picker"
          :allowed-dates="allowedDates"
          v-bind:min="fechaMin"
          v-bind:max="fechaMax"
        ></v-date-picker>

        <v-card-actions>
          <v-btn
            @click="submit"
            :disabled="!valid"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-card-actions>

      </v-form>
      </v-card>
    </v-flex>


</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      fechaMin: '2016-06-15',
      fechaMax: '2017-03-20',
      valid: true,
      almuerzo: '',
      almuerzoRules: [
        v => !!v || 'Debes ingresar un almuerzo'
      ],
      valid: true,
      cena: '',
      cenaRules: [
        v => !!v || 'Debes ingresar una cena'
      ]
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported

        }
      },
      clear () {
        this.$refs.form.reset()
      }

    }
  }
</script>
