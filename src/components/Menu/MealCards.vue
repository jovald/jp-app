<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex  xs8>
          <div>
            <div class="headline">{{ title }}</div>
            <div class="sub-text indigo--text text--darken4">{{ value }}</div>
            <div class="sub-text indigo--text text--darken4">{{ tipo }}</div>
          </div>
        </v-flex>

        <v-flex xs4>
          <v-card-actions>
            <v-btn flat large><v-icon x-large> local_dining</v-icon></v-btn>
          </v-card-actions>
        </v-flex>

      </v-layout>

      <v-layout row>
        <v-flex xs8>
          <v-icon x-large>group_add</v-icon>
        </v-flex>

        <v-flex xs4>
          <v-btn v-on:click="substractCounter" style="min-width:0" small flat><v-icon>keyboard_arrow_left</v-icon></v-btn>
          <p style="display: inline">{{ counter }}</p>
          <v-btn v-on:click="addCounter" style="min-width:0" small flat><v-icon>keyboard_arrow_right</v-icon></v-btn>
        </v-flex>


      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'MealCard',
  data: () => ({
    counter: 0

  }),
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    },
    tipo: {
      type: String
    }
  },
  methods: {
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
