<template>
  <v-container fluid class="format">
        <v-card >
          <v-card-title flat dense dark>
            <h1>Inscription</h1>
            </v-card-title>
          <v-card-text>
            <v-form v-model="isValid">
              <v-text-field
                label="username"
                v-model="username"
                type="text"
                :rules="[(v) => !!v || 'Nom requis']"
                required
              ></v-text-field>
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                type="password"
                :rules="[(v) => !!v || 'Mot de passe requis']"
                required
                hint="Votre mot de passe doit faire entre 8 et 20 caractères, avec une majuscule et un chiffre"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <div class="danger-alert message" v-html="errorMessage" />
          <div class="danger-alert message" v-html="message"></div>

          <v-card-actions class=" d-flex justify-center">
            <v-btn
              elevation="2"
              :disabled="!isValid"
              v-on:click.prevent="signup"
              >S'inscrire</v-btn
            >
          </v-card-actions>
        </v-card>
  </v-container>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService.js";
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: null,
      message: null,
      isValid: true,
      emailRules: [
        (v) => !!v || "Email obligatoire",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'email doit être valide",
      ],
      usernameRules: [
        (v) => v.length <= 30 || "Entre 3 et 30 caractères, sans symboles",
      ],
      passwordRules: [
        (v) =>
          v.length <= 30 ||
          "Le mot de passe doit être de 8 lettres minimum, majuscules et minucules, pas de symboles",
      ],
    };
  },
  methods: {
    async signup() {
      try {
        const response = await AuthenticationService.signup({
          username: this.username,
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
        }, 1500);
      } catch (error) {
        this.errorMessage = error.response.data.error;
        setTimeout(() => {
          this.errorMessage = "";
        }, 1500);
      }
    },
  },
};
</script>

<style></style>
