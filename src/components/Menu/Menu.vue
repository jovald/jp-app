<template>
    <v-flex xs10 offset-xs1 >
      <v-card>
      <v-flex xs10 offset-xs1 >
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
      </v-flex>
      </v-card>
    </v-flex>


</template>

<script>
  export default {
    created: function () {
      this.getActualWeek()
    },
    data: () => ({
      fechaMin: '',
      fechaMax: '',
      valid: true,
      almuerzo: '',
      almuerzoRules: [
        v => !!v || 'Debes ingresar un almuerzo'
      ],
      cena: '',
      cenaRules: [
        v => !!v || 'Debes ingresar una cena'
      ]
    }),

    methods: {
      getActualWeek: function () {
        var curr = new Date() // get current date
        var first = curr.getDate() - curr.getDay() + 1 // First day is the day of the month - the day of the week
        var last = first + 5 // last day is the first day + 6

        var firstday = new Date(curr.setDate(first)).toISOString()
        var lastday = new Date(curr.setDate(last)).toISOString()
        firstday = firstday.split('T').shift()
        lastday = lastday.split('T').shift()
        this.fechaMin = firstday
        this.fechaMax = lastday
      },
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
