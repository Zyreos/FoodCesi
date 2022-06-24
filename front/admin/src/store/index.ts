import { createStore } from "vuex";
import VuexPersister from 'vuex-persister'
const vuexPersister = new VuexPersister({
  overwrite: true,
});

export default createStore({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
  },
  plugins: [vuexPersister.persist],
  getters: {},
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  },
  modules: {},
});
