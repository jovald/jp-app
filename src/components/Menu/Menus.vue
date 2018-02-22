<template>

  <v-container fluid grid-list-lg style="min-heigth:0">
    
    <v-layout row wrap>
      <v-flex xs12 md6 v-for="item in generalData" :key="item.title">
        <meal-card
          :tipo ="item.tipo"
          :title="item.title"
          :value="item.value"
        ></meal-card>
      </v-flex>
    </v-layout>


    <v-layout v-for="menu in menus" v-bind:key="menu.id" row wrap>

      <v-flex xs12 sm6>
        <v-card>
          <v-card-media
            class="white--text"
            height="200px"
            :src = "menu.almuerzo.imagen"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{ menu.almuerzo.titulo }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title>
            <div>
              <span class="grey--text">Fecha {{ menu.fecha }}</span><br>
              <span>Almuerzo</span><br>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn
            block v-bind:class="{ green: menu.almuerzo.activo, 'white--text': menu.almuerzo.activo }"
            @click="cambiarEstadoMenu(menu.almuerzo)"
            >Almozaré</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6>
        <v-card>
          <v-card-media
            class="white--text"
            height="200px"
            :src="menu.cena.imagen"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{ menu.cena.titulo }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title>
            <div>
              <span class="grey--text">Fecha {{ menu.fecha }}</span><br>
              <span>Cena</span><br>

            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn
            block v-bind:class="{ green: menu.cena.activo, 'white--text': menu.cena.activo}"
            @click="cambiarEstadoMenu(menu.cena)"
            >Cenaré</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import MealCard from '@/components/Menu/MealCards'

  export default {
    data: () => ({

      generalData: [
          { title: 'Lentejas', value: '01/02/2018', tipo: 'Almuerzo' },
          { title: 'Caldito', value: '01/02/2018', tipo: 'Cena' }
      ]
    }),
    components: {
      MealCard
    },
    methods: {
      cambiarEstadoMenu: function (comida) {
        if (comida.activo) {
          comida.activo = false
        } else {
          comida.activo = true
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
