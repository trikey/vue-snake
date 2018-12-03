<template>
    <div class="row">
        <div class="flex-item">
            <p>Счёт: {{ score }}</p>
            <p><a href="#" @click.prevent="finishGame()">Закончить игру</a></p>
            <div v-for="y in list" :key="y">
                <span class="box" :class="{ snake: isSnake(x, y), food: isFood(x, y) }" v-for="x in list"
                      :key="x"></span>
            </div>
        </div>
    </div>
</template>
<script>
  import _ from 'lodash';
  import {mapGetters} from 'vuex' // Подключаем хелпер
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        pointsCount: 20,
        snake: [],
        snakeLength: 0,
        snakeDirection: 'right',
        food: {
          x: null,
          y: null,
        },
      };
    },
    mounted() {
      this.newGame();
      window.addEventListener('keyup', this.changeDirection);
      setInterval(this.move, 300);
    },
    computed: {
      list() {
        return [...Array(this.pointsCount).keys()];
      },
      ...mapGetters({
        score: 'score'
      })
    },
    methods: {
      newGame() {
        this.snake = [{ x: 0, y: 0 }];
        this.snakeDirection = 'right';
        this.snakeLength = 1;
        this.food = this.getRand();
      },
      getRand() {
        return { x: Math.floor(Math.random() * this.pointsCount), y: Math.floor(Math.random() * this.pointsCount) }
      },
      isSnake(x, y) {
        return _.reduce(this.snake, (carry, n) => {
          return n.x === x && n.y === y ? true : carry;
        }, false);
      },
      isFood(x, y) {
        return this.food.x === x && this.food.y === y;
      },
      eat() {
        this.snakeLength += 1;
        this.food = this.getRand();
      },
      move() {
        let { x, y } = this.snake[this.snake.length - 1];

        switch (this.snakeDirection) {
          case 'up':
            y -= 1;
            break;
          case 'right':
            x += 1;
            break;
          case 'down':
            y += 1;
            break;
          case 'left':
            x -= 1;
            break;
        }

        if (y >= this.pointsCount) {
          y = 0;
        }
        if (x >= this.pointsCount) {
          x = 0;
        }
        if (y < 0) {
          y = this.pointsCount - 1;
        }
        if (x < 0) {
          x = this.pointsCount - 1;
        }

        const selfBite = _.reduce(this.snake, (carry, point) => {
          return point.x === x && point.y === y ? true : carry;
        }, false);

        if (selfBite) {
          this.finishGame();
          this.newGame();
        }

        this.snake.push({ x, y });
        if (this.snake.length > this.snakeLength) {
          this.snake.shift();
        }

        if (x === this.food.x && y === this.food.y) {
          this.eat();
          this.addScore(100);
        }
      },
      changeDirection(e) {
        e.preventDefault();
        e.stopPropagation();
        const directions = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down',
        };
        if (directions[e.which] !== undefined) {
          if (
            !(this.snakeDirection === 'right' && directions[e.which] === 'left') &&
            !(this.snakeDirection === 'left' && directions[e.which] === 'right') &&
            !(this.snakeDirection === 'down' && directions[e.which] === 'up') &&
            !(this.snakeDirection === 'up' && directions[e.which] === 'down')
          ) {
            this.snakeDirection = directions[e.which];
          }
        }
      },
      finishGame() {
        alert('Game over');
        this.registerBestScore(this.score);
        this.clearScore();
        this.endGame();
      },
      ...mapMutations({
        addScore: 'addScore',
        clearScore: 'clearScore',
        registerBestScore: 'registerBestScore',
        endGame: 'endGame',
      })
    },
  };
</script>
<style type="text/css">
    .box {
        width: 20px;
        height: 20px;
        border: 1px solid green;
        display: inline-block;
    }

    .snake {
        background-color: blueviolet;
    }

    .food {
        background-color: green;
    }
</style>