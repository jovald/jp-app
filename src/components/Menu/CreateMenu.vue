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

            <v-form
              v-model="valid"
              ref="form"
              lazy-validation
              @submit.prevent="submit"
            >

              <v-text-field
                label="Comida"
                v-model="titulo"
                :rules="almuerzoRules"
                required
              ></v-text-field>


              <v-select
                :items="tipoComida"
                v-model="tipo"
                label="Tipo de comida"
                single-line
                bottom
                :rules="[v => !!v || 'Item is required']"
                required
              ></v-select>

              <v-date-picker
                full-width
                class="mt-3"
                :color="datePickerColor"
                :first-day-of-week="1"
                locale="es-cl"
                v-model="fecha"
                :min="fechaMin"
                :max="fechaMax"
                @input="validDate"
              ></v-date-picker>

              <v-alert
                type="error"
                :value="status"
                transition="scale-transition"
              >
                Debes ingresar una fecha válida
              </v-alert>

              <v-card-actions>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  type="submit"
                >
                  Agregar
                </v-btn>
                <v-btn
                  @click="clear()"
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
        :items="menus"
        class="elevation-1"
        :loading="this.$store.getters.loading"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
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
          <td>{{ props.item.titulo }}</td>
          <td >{{ props.item.tipo }}</td>
          <td>{{ props.item.fecha }}</td>
          <td>
            <v-btn
              @click="deleting(props.item)"
              color="indigo"
              dark
            >
            Eliminar
            </v-btn>

          </td>
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
      status: false,
      fecha: '',
      fechaMin: '',
      fechaMax: '',
      valid: true,
      tipo: null,
      titulo: '',
      datePickerColor: 'indigo',
      almuerzoRules: [
        v => !!v || 'Debes ingresar un almuerzo'
      ],
      cena: '',
      cenaRules: [
        v => !!v || 'Debes ingresar una cena'
      ],
      tipoComida: ['Almuerzo', 'Cena'],
      headers: [
        {
          text: 'Titulo',
          value: 'titulo'
        },
        { text: 'Tipo',
          value: 'tipo' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Editar/Eliminar', sortable: false, value: 'accion' }
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
        if (this.$refs.form.validate() && this.validDate()) {
          const comida = {
            titulo: this.titulo,
            tipo: this.tipo,
            fecha: this.fecha
          }

          this.$store.dispatch('createMenu', comida)
          this.clear()
        }
      },
      clear () {
        this.$refs.form.reset()
        this.datePickerColor = 'indigo'
        this.fecha = ''
        if (this.status === true) {
          this.status = false
        }
      },
      deleting (menu) {
        // this.menus.splice(this.menus.indexOf(menu), 1)
        this.$store.dispatch('deleteMenu', menu)
      },
      validDate () {
        // Valida que exista fecha
        if (this.fecha === '') {
          this.datePickerColor = 'red'
          this.valid = false
          this.status = true
          return false
        } else {
          this.valid = true
          this.status = false
          this.datePickerColor = 'indigo'
          return true
        }
      }
    },

    computed: {
      menus () {
        return this.$store.getters.loadedMenus
      }
    }

  }
</script>
