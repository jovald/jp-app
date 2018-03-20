<template>
  <v-card :color="cardColor">
    <v-card-media
      :src="src1"
      height="200px"
    >
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <div>
              <div class="display-3 outlineText">{{ titulo }}</div>
              <div class="display-1 outlineText">{{ tipo }}</div>
              <div class="display-1 outlineText">{{ fecha }}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-title>
      <div>
        <div v-if="tipo === 'Cena'" class="headline white--text">Cantidad de personas que cenarán: {{ count }}</div>
        <div v-else class="headline white--text">Cantidad de personas que almorzarán: {{ count }}</div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'CookCard',
  data: () => ({
    src1: '',
    cardColor: '',
    lunchColor: 'orange lighten-3',
    dinnerColor: 'cyan accent-4'

  }),
  props: {
    titulo: {
      type: String
    },
    fecha: {
      type: String
    },
    tipo: {
      type: String
    },
    id: {
      type: String
    },
    count: {
      type: Number
    }
  },
  created () {
    if (this.tipo === 'Almuerzo') {
      this.cardColor = this.lunchColor
      this.src1 = './static/images/almuerzo.jpg'
    } else {
      this.cardColor = this.dinnerColor
      this.src1 = './static/images/cena2.jpg'
    }
  }
}
</script>

<style scoped>
.outlineText {
  color: black;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
</style>
