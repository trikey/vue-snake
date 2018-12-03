<template>
  <div id="app" class="flex-container">
    <Menu v-if="!gameStarted"></Menu>
    <Game v-else></Game>
  </div>
</template>

<script>
import {mapGetters} from 'vuex' // Подключаем хелпер
import Menu from './components/Menu.vue'
import Game from './components/Game.vue'

export default {
  computed: {
    ...mapGetters({
      gameStarted: 'gameStarted'
    })
  },
  components: {
    Menu,
    Game,
  }
}
</script>
