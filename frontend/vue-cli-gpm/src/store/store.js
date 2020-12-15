import Vue from "vue";
import Vuex from "vuex";
import PostsService from "../services/PostsService";
import AuthenticationService from "../services/AuthenticationService";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: {},
    isLoggedIn: false,
    isLoading: false,
    posts: [],
    users: [],
    post: {},
    message: "",
    title: "",
    error: "",
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  getters: {
    posts(state) {
      return state.posts;
    },
    post(state) {
      return state.post;
    },
    users(state) {
      return state.users;
    },
    user(state) {
      return state.user;
    },
    messageRetour(state) {
      return state.message;
    },
    errorMessage(state) {
      return state.error;
    },
    isLogged(state) {
      return state.isLoggedIn;
    },
  },

  mutations: {
   
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    DELETE_TOKEN(state) {
      state.token = null;
      state.user = "";
      state.isLoggedIn = false;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    GET_USER_BY_ID(state, user) {
      state.user = user;
    },
    GET_USERS(state, users) {
      state.users = users;
    },
    DELETE_USER(state, id) {
      state.users = [...state.users.filter((element) => element.id !== id)];
      state.message = "compte supprimé";
    },
    UPDATE_ACCOUNT(state, id, user) {
      Object.assign(
        state.users.find((element) => element.id === id),
        user
      );
      state.message = "compte modifié";
    },
    GET_POSTS(state, posts) {
      (state.posts = posts), (state.isLoading = false);
    },
    GET_ALL_POSTS(state, posts) {
      (state.posts = posts), (state.isLoading = false);
    },
    GET_POST_BY_ID(state, post) {
      state.post = post;
      state.isLoading = false;
    },
    ADD_POST(state, post) {
      state.posts = [post, ...state.posts];
      state.message = "post créé";
    },
    UPDATE_POST(state, id, post) {
      Object.assign(
        state.posts.find((element) => element.id === id),
        post
      );
      state.message = "Votre post est bien modifié";
    },

    DELETE_POST(state, id) {
      state.posts = [...state.posts.filter((element) => element.id !== id)];
      state.title = "titre supprimé";
      state.message = "message supprimé";
    },
    
    ADD_COMMENT(state, comment) {
      state.posts = [comment, ...state.posts];
      state.message = "message commenté";
    },
    DELETE_COMMENT(state, id) {
      state.posts = [...state.posts.filter((element) => element.id !== id)];
      state.message = "commentaire supprimé";
    },
  },
  actions: {
    
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    deleteToken({ commit }, token) {
      commit("DELETE_TOKEN", token);
    },
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    getUsers({ commit }) {
      AuthenticationService.getUsers().then((response) => {
        const users = response.data;
        commit("GET_USERS", users);
      });
    },
    getUserById({ commit }) {
      let id = this.state.user.id;
      AuthenticationService.getUserById(id).then((response) => {
        const user = response.data;
        commit("GET_USER_BY_ID", user);
      });
    },
    deleteUser({ commit }, id) {
      AuthenticationService.deleteUser(id).then(() => {       
          commit("DELETE_USER", id);
      })
    },
    updateAccount({ commit }, data) {
      let id = this.state.user.id;
      axios
        .put(`http://localhost:3030/api/users/accounts/${id}`, data, {
          headers: { Authorization: this.state.token },
        })
        .then((response) => {
          const newUser = response.data;
          commit("UPDATE_ACCOUNT", id, newUser);
        })
        .then (() => {
          PostsService.getAllPosts().then((response) => {
          const posts = response.data;
          commit("GET_ALL_POSTS", posts);
        })
      })
    },
    createPost({ commit }, post) {
      PostsService.createPost(post)
        .then((response) => {
          const post = response.data;
          commit("ADD_POST", post);
        })
        .then(() => {
          PostsService.getAllPosts().then((response) => {
            const posts = response.data;
            commit("GET_ALL_POSTS", posts);
          });
        });
    },
    getPosts({ commit }) {
      PostsService.getPosts().then((response) => {
        const posts = response.data;
        commit("GET_POSTS", posts);
      });
    },
    getAllPosts({ commit }) {
      PostsService.getAllPosts().then((response) => {
        const posts = response.data;
        commit("GET_ALL_POSTS", posts);
      })
    },
    getPostById({ commit }, id) {
      PostsService.getPostById(id).then((response) => {
        const post = response.data;
        commit("GET_POST_BY_ID", post);
      });
    },
    updatePost({ commit }, data) {
      let id = this.state.post.id;
      axios
        .put(`http://localhost:3030/api/posts/${id}`, data, {
          headers: { Authorization: this.state.token },
        })
        .then((response) => {
          const post = response.data;
          commit("UPDATE_POST", id, post);
        });
    },
    
    deletePost({ commit }, id) {
      PostsService.deletePost(id)
        .then(() => {
          commit("DELETE_POST", id);
        })
        .then(() => {
          PostsService.getAllPosts().then((response) => {
            const posts = response.data;
            commit("GET_ALL_POSTS", posts);
          });
        });
    },

    addComment({ commit }, payload) {
      axios
        .post(
          `http://localhost:3030/api/posts/${payload.id}/comments`,
          payload.data,
          { headers: { Authorization: this.state.token } }
        )
        .then((response) => {
          const comment = response.data;
        commit("ADD_COMMENT", comment);
        })
        .then(() => {
          PostsService.getAllPosts().then((response) => {
            const posts = response.data;
            commit("GET_ALL_POSTS", posts);
          });
        });
    },

    deleteComment({ commit }, id) {
      PostsService.deleteComment(id)
        .then(() => {
          commit("DELETE_COMMENT", id);
        })
        .then(() => {
          PostsService.getAllPosts().then((response) => {
            const posts = response.data;
            commit("GET_ALL_POSTS", posts);
          });
        });
    },
  },
});
