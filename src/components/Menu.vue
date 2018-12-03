<template>
    <div class="row">
        <div class="flex-item"><a href="#" @click.prevent="startGame()">Начать игру</a></div>
        <div class="flex-item"><p>Лучший счет: {{ bestScore }}</p></div>
    </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex' // Подключаем хелпер

  export default {
    computed: {
      ...mapGetters({
        bestScore: 'bestScore'
      })
    },
    methods: {
      ...mapMutations({
        startGame: 'startGame',
      })
    },
  };
</script>