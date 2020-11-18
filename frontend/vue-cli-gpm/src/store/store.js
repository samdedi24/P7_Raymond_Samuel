import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationService from "../services/AuthenticationService"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    username: null,
    email: null,
    token: null,
    userId: null,
    isUserLoggedIn: false,
    isAdmin: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    getUserById (state, user) {
      state.user = user;
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    getUserById({ commit }) {
        let id = this.state.user.id;
        AuthenticationService.getUserById(id).then((response) => {
          const user = response.data;
          commit("getUserById", user);
        });
    },
  },
  modules: {
  }
}) 