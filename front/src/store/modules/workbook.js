const workbookStore = {
  namespaced: true,
  state: {
    workbooks: [],
  },
  getters: {
    workbooks(state) {
      return state.questions;
    },
  },
  mutations: {
    setWorkbooks(state, payload) {
      state.questions = payload;
    },
  },
  actions: {},
};

export default workbookStore;
