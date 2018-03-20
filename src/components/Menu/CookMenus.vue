<template>

  <v-container fluid grid-list-lg style="min-heigth:0">
    <v-progress-circular v-if="this.$store.getters.loading" class="progress" indeterminate :size="70" :width="7" color="indigo"></v-progress-circular>

    <h3 class="headline mb-0 centeredText">Menú Semanal</h3>
    <v-layout row wrap>
      <v-flex  xs12 md6 v-for="menu in menus" :key="menu.id">
        <cook-card
          :tipo ="menu.tipo"
          :titulo="menu.titulo"
          :fecha="menu.fecha"
          :id="menu.id"
          :count="menu.count"
          class="mb-2"
        ></cook-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import CookCard from '@/components/Menu/CookCard'

  export default {
    data: () => ({
    }),
    created () {
      this.$store.dispatch('loadCookMenu')
    },
    computed: {
      menus () {
        return this.$store.getters.loadedCookMenus.sort(function (a, b) {
          if (a.fecha.localeCompare(b.fecha) === 0) {
            return a.tipo.localeCompare(b.tipo)
          }
        })
      }
    },
    components: {
      CookCard
    }
  }
</script>

<style scoped>
  .progress {
    position: absolute;
    left: 50vw;
    top: 50vh;
    opacity: 0.7;
    z-index: 2;
  }

  .centeredText {
    text-align: center;
    padding-top: 0.5%;
    padding-bottom: 0.5%;
  }

</style>
