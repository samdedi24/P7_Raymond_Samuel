import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationService from "../services/AuthenticationService"
//import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    username: null,
    email: null,
    token: null,
    UserId: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, UserId) {
      state.UserId = UserId
    },
    getUserById (state, UserId) {
      state.user = UserId;
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, UserId) {
      commit('setUser', UserId)
    },
    getUserById({ commit }) {
      let id = this.state.UserId.id;
      AuthenticationService.getUserById(id).then((response) => {
        const user = response.data;
        commit("getUserById", user);
      });
    },
  },
  modules: {
  }
})