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
              <div class="headline black--text">{{ titulo }}</div>
              <div class="sub-text black--text text--darken4">{{ fecha }}</div>
              <div class="sub-text black--text text--darken4">{{ tipo }}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-actions>
      <v-btn v-on:click="substractCounter" style="min-width:0" fab small flat><v-icon>keyboard_arrow_left</v-icon></v-btn>
      <p style="display: inline">{{ counter }}</p>
      <v-btn v-on:click="addCounter" style="min-width:0" fab small flat><v-icon>keyboard_arrow_right</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-btn v-on:click="pressed = !pressed; changeColor();" fab flat icon><v-icon x-large>local_dining</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'MealCard',
  data: () => ({
    counter: 0,
    pressed: false,
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
    }
  },
  created () {
    if (this.tipo === 'Almuerzo'){
      this.cardColor = this.lunchColor
      this.src1 = './static/images/almuerzo.jpg'
    } else {
      this.cardColor = this.dinnerColor
      this.src1 = './static/images/cena2.jpg'
    }
  },

  methods: {
    changeColor: function () {
      if (this.pressed === true) {
        this.cardColor = 'green lighten-3'
      }
      else if (this.tipo === 'Almuerzo') {
        this.cardColor = this.lunchColor
      }
      else if (this.tipo === 'Cena') {
        this.cardColor = this.dinnerColor
      }
    },
    addCounter: function () {
      if (this.counter < 4) {
        this.counter++
      }
    },
    substractCounter: function () {
      if (this.counter > 0) {
        this.counter--
      }
    }
  }
}
</script>
