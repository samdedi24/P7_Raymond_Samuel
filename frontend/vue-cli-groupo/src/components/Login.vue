<template>
    <div>
        <form class="format">
            <v-text-field
                label="email"
                v-model="email"
                type="email">
            </v-text-field>
            <v-text-field
                label="password"
                v-model="password"
                type="password">
            </v-text-field>
        </form>   
            <v-btn
                dark
                class="cyan"
                @click="login">
                Connexion
            </v-btn>
    </div>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService.js";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
      isValid: true,
      message: null,
    };
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.userId)
        this.$router.push("/posts")
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>


<style lang="scss">
    .format {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin: auto;
        width: 700px;
        padding-top: 50px;
    }
    .cyan {
        display: flex;
        text-align: center;
        margin: auto;
    }
</style>