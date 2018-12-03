import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    gameStarted: false,
    score: 0,
    bestScore: localStorage.getItem('bestScore') !== null ? localStorage.getItem('bestScore') : 0,
  },
  getters: {
    gameStarted: state => {
      return state.gameStarted;
    },
    score: state => {
      return state.score;
    },
    bestScore: state => {
      return state.bestScore;
    },
  },
  mutations: {
    startGame: (state) => {
      state.gameStarted = true;
    },
    endGame: (state) => {
      state.gameStarted = false;
    },
    addScore: (state, score) => {
      state.score += score;
    },
    clearScore: (state) => {
      state.score = 0;
    },
    registerBestScore: (state, score) => {
      if (score > state.bestScore) {
        state.bestScore = score;
        localStorage.setItem('bestScore', state.bestScore);
      }
    },
  },
  actions: {},
});