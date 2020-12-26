<template>
  <v-container fluid class="signup-container">
    <v-layout v-if="$store.state.isLoggedIn" row class="account-box mb-5">
      <v-col lg="4" md="6" sm="7" class="mx-auto">
        <v-card class="account-card d-flex flex-column" elevation="4" xs6>
          <div class="profil-top pb-3 ">
            <v-btn to="/all" class="mx-2 return-btn" x-small>
              Retour
            </v-btn>
            <v-card-title flat dense dark class="profil-title mr-3"
              ><h1 class="titre">Profil</h1>
            </v-card-title>
            <div class="delete-user">
              <v-tooltip v-if="!$store.state.user.admin === true" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="deleteUser(user.id)"
                     aria-label="supprimer son compte"
                    class="mx-2"
                    fab
                    x-small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon small class=" rounded-circle ">
                      $vuetify.icons.delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Supprimer le compte</span>
              </v-tooltip>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="profil-middle mt-3 ">
            <v-card-title
              v-if="showUsername"
              dark
              class=" profil-middle__left d-flex justify-space-between"
            >
              <span class="username"> Salut {{ user.username }} ! </span>
              <v-btn @click="toggleUsername" x-small>
                Modifier
              </v-btn>
            </v-card-title>
            <v-text-field
              v-if="updateUsername"
              label="Nouveau Username"
              v-model="newUsername"
              :rules="UsernameRules"
              required
              counter="30"
              hint="Le prénom doit avoir 3 caractères min et 30 max"
              class="input-group--focused  mx-3"
            ></v-text-field>

            <v-divider></v-divider>
            <v-card-title
              v-if="showPhoto"
              class="profil-middle__right d-flex  flex-column"
            >
              <v-avatar size="93px" class="mt-2">
                <img
                  rounded
                  v-if="user.photo"
                  :src="user.photo"
                  alt="Photo de profil"
                />
                <v-icon
                  :color="isLoggedIn"
                  size="96px"
                  aria-label="avatar"
                  v-else
                  >$vuetify.icons.account</v-icon
                >
              </v-avatar>
              <v-btn @click="togglePhoto" class="mx-2" x-small>
                Changer
              </v-btn>
            </v-card-title>

            <div v-if="updatePhoto" class="d-flex justify-center">
              <label for="image" class="mr-3">Photo</label>
              <input
                @change="imageUrl"
                type="file"
                accept="image/png, image/jpeg,
                    image/bmp, image/gif"
                ref="file"
                name="image"
                class="input-group--focused"
              />
            </div>
          </div>
          <v-divider></v-divider>
          <v-card-text v-if="showBio" class=" bio">
            <div
              class="d-flex flex-column justify-space-between"
              max-width="70%"
            >
              <strong>Votre bio </strong>
              <div>
                <span v-if="!user.bio"> Parle nous de toi !</span>
                <span class="bio-field">{{ user.bio }}</span>
              </div>
            </div>
            <v-btn @click="toggleBio" class="mx-2 mt-2 mr-n6" x-small>
              Modifier
            </v-btn>
          </v-card-text>
          <v-textarea
            v-if="updateBio"
            label="Bio"
            v-model="newBio"
            :rules="bioRules"
            solo
            name="input-7-4"
            class="input-group--focused bio"
          >
          </v-textarea>
          <div>
            <v-card-text v-if="options" class="font-weight-light">
              <br />
              <div class="danger-alert" v-html="errorMessage" />
              <div class="danger-alert" v-html="messageRetour" />

              <div class="d-flex justify-center">
                <v-btn @click="onSubmit(user.id)" :disabled="!isValid"
                  >Envoyer</v-btn
                >
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-layout>
    <v-card v-else>
      <v-card-title class="post-title-box">
        <div class=" d-flex flex-column update-title pl-3 pb-5 ">
          <span class="title font-weight-light post-title pb-5 "
            >Votre compte a été supprimé</span
          >
        </div>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      updateBio: false,
      updateUsername: false,
      updatePhoto: false,
      showUsername: true,
      showPhoto: true,
      showBio: true,
      isValid: true,
      options: false,
      newUsername: "",
      newBio: "",
      UsernameRules: [
        (v) => v.length <= 30 || "Max 30 caractères",
        (v) => !!v || "Le Username est obligatoire",
      ],
      bioRules: [(v) => v.length <= 400 || "Max 400 caractères"],
      file: "",
      messageRetour: null,
      errorMessage: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isLoggedIn() {
      if (this.$store.state.isLoggedIn) {
        return "pink";
      } else {
        return "";
      }
    },
  },
  beforeMount() {
    this.$store.dispatch("getUserById");
  },
  methods: {
    getBack() {
      this.$router.push("/all");
    },
    toggleUsername() {
      this.updateUsername = true;
      this.showUsername = false;
      this.options = true;
    },
    togglePhoto() {
      this.updatePhoto = true;
      this.showImage = false;
      this.options = true;
      this.showPhoto = false;
    },
    toggleBio() {
      this.updateBio = true;
      this.showBio = false;
      this.options = true;
    },
    imageUrl() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("username", this.newUsername);
      formData.append("bio", this.newBio);
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("getUsers");
      this.$store.dispatch("getUserById", this.user.id);
      this.$store.dispatch("updateAccount", formData);
      this.$store.dispatch("getUserById", this.user.id);
      this.updateBio = false;
      this.updatePhoto = false;
      this.updateUsername = false;
      this.options = false;
      this.showBio = true;
      this.showPhoto = true;
      this.showUsername = true;
    },
    deleteUser(id) {
      this.$store.dispatch("deleteUser", id);
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="scss">
.signup-container{
  background-color: #081F42;
}
.v-avatar {
  margin-top: -20px;
  margin-bottom: 1em;
}
.account-card {
  display: flex;
  justify-content: space-around;
  margin-top: 2em;
  margin-bottom: 4em;
}
.profil-title {
  padding: 0;
}
.profil-top {
  display: flex;
  justify-content: space-between;
  padding-top: 1em;
}
.profil-middle {
  width: 100%;
  margin: auto !important;
}
</style>