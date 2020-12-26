<template>
  <v-container fluid class="post-box">
    <v-card class="mx-auto post-card" max-width="600">
      <v-card-title class="post-title-box">
        <div class="update-title mx-auto">
          <h1 class="font-weight-regular">
            Modifier
          </h1>
          <v-btn @click="getBack" class="mx-1 return-btn" small>
            Retour
          </v-btn>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-if="showTitle" class="d-flex justify-space-between">
          <div class="d-flex flex-column mx-auto">
            <span>Ton titre: </span>
            <div
              class="message ml-n4
                "
            >
              <span>{{ post.title }}</span>
            </div>
          </div>
        </div>

        <div v-if="withTitle" class="text-box">
          <v-textarea
            label="Title"
            v-model="title"
            text="text"
            solo
            type="text"
            required
            name="input-7-4"
            class="mr-5 ml-3 text-area"
          ></v-textarea>
        </div>
        <div class="d-flex justify-center pt-3">
          <v-btn @click="toggleTitle" x-small>
            Changer
          </v-btn>
        </div>
      </v-card-text>
      <v-card-text>
        <div v-if="showMessage" class="d-flex justify-space-between">
          <div class="d-flex flex-column mx-auto">
            <span>Ton message: </span>
            <div
              class="message ml-n4
                "
            >
              <span>{{ post.message }}</span>
            </div>
          </div>
        </div>

        <div v-if="withMessage" class="text-box">
          <v-textarea
            label="Message"
            v-model="message"
            text="text"
            solo
            type="text"
            required
            name="input-7-4"
            class="mr-5 ml-3 text-area"
          ></v-textarea>
        </div>
        <div class="d-flex justify-center pt-3">
          <v-btn @click="toggleMessage" x-small>
            Changer
          </v-btn>
        </div>
      </v-card-text>
      <v-form v-model="isValid" enctype="multipart/form-data" class="validate ">
        <div v-if="showImage">
          <v-img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            :max-height="250"
            :max-width="150"
            class="mx-auto mb-5"
          ></v-img>
        </div>
        <div v-if="withImage" class="pb-5 pt-5 d-flex justify-center">
          <label for="image" class="pr-3">Image</label>
          <input
            @change="imageUrl"
            type="file"
            aria-label="image input"
            accept="image/png, image/jpeg,image/bmp, image/gif"
            ref="file"
            name="image"
          />
        </div>
        <v-card-text v-if="options" class="d-flex justify-center my-3">
          <div class="bloc-option">
            <v-btn
              v-if="post.imageUrl"
              @click="toggleImage"
              class="mx-2 mt-2 "
              x-small
              :elevation="2"
            >
              Changer l'image
            </v-btn>
          </div>
        </v-card-text>
        <div class=" d-flex justify-center  ">
          <v-btn @click="onSubmit" :disabled="!isValid" class="mb-3"
            >Modifier</v-btn
          >
        </div>

      </v-form>
      
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "UpdatePost",
  data() {
    return {
      options: true,
      isValid: true,
      withImage: false,
      withTitle: false,
      withMessage: false,
      showImage: true,
      showTitle: true,
      showMessage: true,
      title: "",
      message: "",
      file: "",
    };
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
   
  },
  beforeMount() {
    let id = this.$route.params.id;
    this.$store.dispatch("getPostById", id);
  },
  methods: {
    toggleTitle() {
      this.withTitle = true;
      this.showTitle = false;
    },
    toggleMessage() {
      this.withMessage = true;
      this.showMessage = false;
    },
    toggleImage() {
      this.withImage = true;
      this.showImage = false;
    },
    imageUrl() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    getBack() {
      this.$router.push("/all");
    },
    onSubmit() {
      let id = this.$route.params.id;
      const formData = new FormData();
      if (this.title !== null) {
        formData.append("title", this.title);
      }
      if (this.message !== null) {
        formData.append("message", this.message);
      }
      formData.append("image", this.file);
          this.$store.dispatch("getAllPosts");
      this.$store.dispatch("updatePost", formData);
      this.$store.dispatch("getPostById", id);
      this.showImage = true;
      this.options = false;
      this.showTitle = true;
      this.showMessage = true;
      this.withImage = false;
      this.withTitle = false;
      this.withMessage = false;
      this.getBack();
    },
    newText() {
      this.textInput = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.message {
  width: auto;
  margin: 1.2em !important;
  padding: 10px;
}
.return-btn {
  position: absolute;
  right: 0;
  top: 10px;
}

</style>