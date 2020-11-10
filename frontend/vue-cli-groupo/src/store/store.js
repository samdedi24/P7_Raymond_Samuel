import Vue from 'vue'
import Vuex from 'vuex'
//import AuthenticationService from "../services/AuthenticationService"
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
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, UserId) {
      commit('setUser', UserId)
    }
  },
  modules: {
  }
})