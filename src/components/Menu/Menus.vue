<template>
  <v-container fluid grid-list-md>
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
            v-on:click="cambiarEstadoMenu(menu.almuerzo)"
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
            v-on:click="cambiarEstadoMenu(menu.cena)"
            >Cenaré</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    data: () => ({
      menus: [
        {
          id: 1,
          almuerzo: { titulo: 'Lentejas', imagen: '/static/images/almuerzo.jpg', activo: true },
          cena: { titulo: 'Pollo con arroz arabe', imagen: '/static/images/cena.jpg', activo: true },
          fecha: '12/12/2018'
        },
        {
          id: 2,
          almuerzo: { titulo: 'Fideos con salsa', imagen: '/static/images/almuerzo.jpg', activo: false },
          cena: { titulo: 'Caldito', imagen: '/static/images/cena.jpg', activo: false },
          fecha: '13/12/2018'
        }
      ]
    }),
    methods: {
      cambiarEstadoMenu: function (comida) {
        if (comida.activo) {
          comida.activo = false
        } else {
          comida.activo = true
        }
      }
    }
  }
</script>
