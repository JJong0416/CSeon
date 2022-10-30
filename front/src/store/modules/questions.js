import axios from "axios";

const questionsStore = {
  namespaced: true,
  state: {
    questions: [],
    searchs: [],
  },
  getters: {
    questions(state) {
      return state.questions;
    },
    searchs(state) {
      return state.searchs;
    },
  },
  mutations: {
    setQuestions(state, payload) {
      state.questions = payload;
    },
    setSearchs(state, payload) {
      state.searchs = payload;
    },
  },
  actions: {
    getQuestions({ commit }, payload) {
      console.log("getQuestions start", payload);
      commit("setQuestions", [{ id: 1, title: "title1" }]);
      // axios.get().then().catch();
    },
    getSearchs({ commit }, payload) {
      console.log("getSearchs start", payload);
      commit("setSearchs", [{ id: 1, title: "title1" }]);
    },
  },
};

export default questionsStore;
