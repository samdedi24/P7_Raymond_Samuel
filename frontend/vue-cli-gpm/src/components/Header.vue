<template>
    <nav>
        <v-toolbar fixed dark>
          <v-toolbar-title class="">
            <img alt="Logo Groupomania" src="../assets/icon-left-font-monochrome-black.png">
        </v-toolbar-title>
          <v-spacer></v-spacer>
            <v-toolbar-items class="head">
              <v-btn 
                v-if="!$store.state.isLoggedIn"
                aria-label="Se connecter"
                text 
                dark
                :to="{
                  name: 'login'
                }">
                Login
              </v-btn>
              <v-btn 
                v-if="!$store.state.isLoggedIn"
                aria-label="Inscription"
                text 
                dark
                :to="{
                  name: 'signup'
                }">
                Sign Up
              </v-btn>
              <v-btn  
                v-if="$store.state.isLoggedIn"
                aria-label="Page des profils"
                text
                dark
                to="/accounts">
                Les profils
              </v-btn>
              <v-btn 
                v-if="$store.state.isLoggedIn"
                aria-label="L'actualitées des utilisateurs"
                text 
                dark
                :to="{
                  name: 'wall'
                }">
                Actualités
              </v-btn>
              <v-btn  
                v-if="$store.state.isLoggedIn"
                aria-label="Page de ton profil"
                text
                dark  
                @click="getUserProfile($store.state.user.id)">
                Profil
              </v-btn>
              <v-btn 
                v-if="$store.state.isLoggedIn"
                aria-label="Se déconnecter"
                text 
                dark
                @click="logout">
                LogOut
              </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </nav>
</template>

<script>
export default {
  name: "Header",
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
  .v-btn {
    width: auto;
  }
  @media screen and (max-width: 800px) {
    .v-btn {
      width: auto;
      margin-right: 15px;
    }
  }
  @media screen and (max-width: 500px) {
    img {
      display: none;
    }
    .v-btn {
      width: 80px;
    }
  }
</style> 