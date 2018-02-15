<template>
  <v-container grid-list-md>
    <hr>
    <v-layout v-for="menu in menus" :key="menu.id">
      <v-flex xs6 sm6>
        <v-card>
          <v-card-media
            class="white--text"
            height="200px"
            src="/static/images/almuerzo.jpg"
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
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs6 sm6>
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
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
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
          almuerzo: { titulo: 'Lentejas', imagen: '/static/images/almuerzo.jpg' },
          cena: { titulo: 'Pollo con papas fritas', imagen: '/static/images/cena.jpg' },
          fecha: '12/12/2018'
        },
        {
          id: 2,
          almuerzo: { titulo: 'Fideos con salsa', imagen: '/static/images/almuerzo.jpg' },
          cena: { titulo: 'Caldito', imagen: '/static/images/cena.jpg' },
          fecha: '13/12/2018'
        }
      ]
    })
  }
</script>
