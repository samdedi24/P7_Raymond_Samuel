<template>
  <v-container fluid class="post-box">
    <v-card class="mx-auto post-card" max-width="600">
      <v-card-title class="post-title-box">
        <div>
          <h1>
            Ecris ton actu !
          </h1>
        </div>
      </v-card-title>
      <v-form
        v-model="isValid"
        @submit.prevent="onSubmit"
        enctype="multipart/form-data"
        class="validate"
      >
        <div class="bloc-statut py-5 px-5 mr-5">
            <v-textarea
              name="input-1-3"
              label="Title"
              v-model="title"
              :rules="[rules.required]"
              auto-grow
            ></v-textarea>
            <v-textarea
              name="input-1-3"
              label="Message"
              v-model="message"
              :rules="[rules.required]"
              auto-grow
              class="input-group--focused"
            ></v-textarea>
        </div>
        <v-card-text
          v-if="options"
          class="d-flex flex-column justify-center my-3"
        >
          <div class=" d-flex justify-center">
          </div>
          <div>
            <div class=" d-flex justify-space-around">
              <v-btn @click="toggleImage" small>
                Image
              </v-btn>
            </div>
          </div>
        </v-card-text>
        <div class="d-flex justify-center">
          <div v-if="withImage" class="pb-5 pt-5 ">
            <div class="d-flex  justify-center ">
              <label for="image" class="pr-2">Image</label>
              <input
                @change="uploadImage"
                type="file"
                accept="image/png, image/jpeg,
                image/bmp, image/gif"
                ref="file"
                name=" charger une image"
                class="input-group--focused"
              />
            </div>
          </div>
        </div>
        <div class="pb-5 pt-5 d-flex justify-center">
          <v-btn @click="onSubmit" :disabled="!isValid">Poster</v-btn>
        </div>
      </v-form>
      <br />
      <br />
      <div>
        <div class="danger-alert" v-html="errorMessage" />
        <div class="danger-alert" v-html="messageRetour" />
      </div>
    </v-card>
  </v-container>
</template>
<script>

export default {
  name: "NewPost",
  data() {
    return {
      isValid: true,
      options: true,
      showImage: false,
      withImage: false,
      withText: false,
      message: "",
      title: "",
      file: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    messageRetour() {
      return this.$store.getters.message;
    },
    errorMessage() {
      return this.$store.getters.error;
    },
  },
  methods: {
    toggleImage() {
      (this.withImage = true), (this.options = false);
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("message", this.message);
      formData.append("title", this.title);
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("createPost", formData);
      this.$router.push("/all");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>