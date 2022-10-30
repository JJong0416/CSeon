const competitionStore = {
  namespaced: true,
  state: {
    competition: [],
  },
  getters: {
    competition(state) {
      return state.questions;
    },
  },
  mutations: {
    setCompetition(state, payload) {
      state.questions = payload;
    },
  },
  actions: {},
};

export default competitionStore;
