<template>
  <v-card :color="cardColor">
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex  xs8>
          <div>
            <div class="headline">{{ titulo }}</div>
            <div class="sub-text indigo--text text--darken4">{{ fecha }}</div>
            <div class="sub-text indigo--text text--darken4">{{ tipo }}</div>
          </div>
        </v-flex>

        <v-flex xs4>
          <v-card-actions>
            <v-btn v-on:click="pressed = !pressed; changeColor();" fab flat large><v-icon x-large>local_dining</v-icon></v-btn>
          </v-card-actions>
        </v-flex>

      </v-layout>

      <v-layout row>
        <v-flex xs8>
          <v-icon x-large>group_add</v-icon>
          <div style="display: inline" class="sub-text indigo--text">Gäste</div>
        </v-flex>

        <v-flex xs4>
          <v-btn v-on:click="substractCounter" style="min-width:0" fab small flat><v-icon>keyboard_arrow_left</v-icon></v-btn>
          <p style="display: inline">{{ counter }}</p>
          <v-btn v-on:click="addCounter" style="min-width:0" fab small flat><v-icon>keyboard_arrow_right</v-icon></v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'MealCard',
  data: () => ({
    counter: 0,
    pressed: false,
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
    } else {
      this.cardColor = this.dinnerColor
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
