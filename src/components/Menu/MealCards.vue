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
    <v-card-actions>
      <v-btn v-on:click="substractCounter" style="min-width:0" flat icon><v-icon>keyboard_arrow_left</v-icon></v-btn>
      <p style="display: inline">{{ counter }}</p>
      <v-btn v-on:click="addCounter" style="min-width:0" flat icon><v-icon>keyboard_arrow_right</v-icon></v-btn>
      <v-spacer></v-spacer>
      <!-- <v-btn v-on:click="pressed = !pressed; changeColor();" flat icon><v-icon x-large>local_dining</v-icon></v-btn> -->
      <app-menu-register-dialog :menuId="id"></app-menu-register-dialog>
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
    },
    id: {
      type: String
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
  },

  methods: {
    changeColor: function () {
      if (this.pressed === true) {
        this.cardColor = 'green lighten-3'
      } else if (this.tipo === 'Almuerzo') {
        this.cardColor = this.lunchColor
      } else if (this.tipo === 'Cena') {
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

<style scoped>
.outlineText {
  color: black;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
</style>
