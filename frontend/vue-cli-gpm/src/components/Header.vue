<template>
    <nav>
        <v-toolbar fixed dark>
    <v-toolbar-title class="">
      <img alt="Vue logo" src="../assets/logo.png">
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>

      <v-btn 
        v-if="!$store.state.isLoggedIn"
        text 
        dark
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>

      <v-btn 
        v-if="!$store.state.isLoggedIn"
        text 
        dark
        :to="{
          name: 'signup'
        }">
        Sign Up
      </v-btn>

      <v-btn 
        v-if="$store.state.isLoggedIn"
        text 
        dark
         :to="{
          name: 'posts'
        }">
        Actualités
      </v-btn>

      <v-btn  
        v-if="$store.state.isLoggedIn"
        text
        dark  
        @click="getUserProfile">
        Mon profil
      </v-btn>

      <v-btn 
        v-if="$store.state.isLoggedIn"
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
export default {
  name: "PageHeader",
  props: {
    user: {
      type: Object,
    }, 
  },
  data () {
    return {
    };
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged
    },
    isLoggedIn() {
      if (this.$store.state.isLoggedIn) {
        return "pink";
      } else {
        return "";
      }
    },
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push("/login")
    },
    getUserProfile(id) {
      this.$router.push(`/accounts/${id}`);
    }
  }
}
</script>

<style scoped>
  img{
    width: 160px;
  }
</style> 