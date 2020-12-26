<template>
    <div>
        <v-card fluid class="format">
            <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="[(v) => !!v || 'Email requis valide']"
                required
                >
            </v-text-field>
            <v-text-field
                label="password"
                v-model="password"
                type="password"
                :rules="[(v) => !!v || 'Mdp requis valide']"
                required
                >
            </v-text-field>
        </v-card>   
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
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
  
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("getUserById", response.data.user.id);
        let router = this.$router;
        setTimeout(function() {
          router.push("/all");
        }, 10);
      } catch (error) {
        this.errorMessage = error.response.data.error;
        setTimeout(() => {
          this.email= "";
          this.password= "";
          this.errorMessage = "";
        }, 200);
      }
    },
  },
};
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


