
<template>
    <nav>
        <v-toolbar fixed dark>
    <v-toolbar-title class="">
      <img alt="Vue logo" src="../assets/logo.png">
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>

      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        text 
        dark
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>
      
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        text 
        dark
        :to="{
          name: 'signup'
        }">
        Sign Up
      </v-btn>
      
      <v-btn 
        v-if="$store.state.isUserLoggedIn"
        text 
        dark
         :to="{
          name: 'posts'
        }">
        Actualités
      </v-btn>

      <v-btn  
        v-if="$store.state.isUserLoggedIn"
        text
        dark  
        @click="getUserProfile(id)">
        Mon profil
      </v-btn>

      <v-btn 
        v-if="$store.state.isUserLoggedIn"
        text 
        dark
        @click="logout">
        Log Out
      </v-btn>

    </v-toolbar-items>
  </v-toolbar>
    </nav>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "PageHeader",
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: mapState(
    ['state']
  ),
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push("/login")
    },
    getUserProfile(id) {
      this.$router.push(`/account/${id}`);
    }
  }
}
</script>

<style scoped>
  img{
    width: 160px;
  }