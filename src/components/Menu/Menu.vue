<template>
    <v-container fluid grid-list-lg>

      <v-layout wrap>


        <v-flex md4 xs12>

      <v-card>
        <v-card-title primary-title>
              <div class="headline">Administrar Menús</div>
            </v-card-title>
        <v-card-actions>

          <v-container>

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
                  color="primary"
                >
                  Agregar
                </v-btn>
                <v-btn
                  @click="clear"
                  flat
                >Borrar</v-btn>
              </v-card-actions>

            </v-form>
          </v-container>
        </v-card-actions>

      </v-card>

    </v-flex>

    <v-flex md8 xs12>


      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }}
            </span>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </template>
      </v-data-table>

    </v-flex>


    </v-layout>
    </v-container>


</template>

<script>
  export default {
    created: function () {
      this.getActualWeek()
    },
    data: () => ({
      picker: '',
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
      ],
      headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
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
