import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import userStore from "./modules/user";
import workbookStore from "./modules/workbook";
import questionsStore from "./modules/questions";
import competitionStore from "./modules/competition";

const store = new Vuex.Store({
  modules: {
    userStore,
    workbookStore,
    questionsStore,
    competitionStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;
