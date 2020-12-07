<template>
  <v-container fluid class="feed-container">
    <v-row class="bloc">
      <v-col sm="12" md="6" class="mx-auto">
        <v-card flat class="posts-card ">
          <h1 class="font-weight-regular text-center">Actualités</h1>
          <v-card-title
            class=" d-flex justify-space-between"
            fixed
            flat
            dense
            dark
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn small to="/add" v-bind="attrs" v-on="on">
                  <v-icon aria-label="publier" role="img" aria-hidden="false">{{
                    mdiPencilOutline
                  }}</v-icon>
                </v-btn>
              </template>
              <span>Publier</span>
            </v-tooltip>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class=" bloc2 text-center d-flex flex-column justify-center align-center"
    >
      <v-col sm="12" md="6" class="mx-auto">
        <v-card
          v-if="$store.state.posts.length !== 0"
          class="posts-card mx-auto"
          elevation="2"
        >
          <v-card-text>
            <posts
              v-for="post of posts"
              :key="post.id"
              :post="post"
              :id="post.id"
              @deletePost="deletePost(post.id)"
              @reloadWall="reloadWall()"
              @onSubmitComment="onSubmitComment(post.id)"
              @deleteComment="deleteComment(comment.id)"
            >
            </posts>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card
      v-if="$store.state.posts.length === 0"
      class="posts-card mx-auto"
      elevation="0"
    >
      <v-card-title class="d-flex justify-center" flat dense dark>
        <span>Sois le premier à publier un post !</span>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import Posts from "@/components/Posts.vue";
import { mdiPencilOutline } from "@mdi/js";
export default {
  name: "Wall",
  components: {
    Posts,
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },
  data() {
    return {
      errorMessage: null,
      mdiPencilOutline,
    };
  },
  beforeMount() {
    this.$store.dispatch("getAllPosts");
  },
  methods: {
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id);
    },
  },
};
</script>

<style lang="scss" scoped></style>