<template>
    <v-card class="posts-card mx-auto mt-2 mb-6 pb-4" round elevation="3" v-if="post.User">
      <div>
        <div class="d-flex justify-space-between pr-3 mb-2">
          <v-card-title class="post-title">
            <v-avatar class="profil-post" size="52px">
              <img
                v-if="post.User.photo"
                :src="post.User.photo"
                alt="Photo de profil"
              />
              <v-icon
                role="avatar"
                v-else-if="
                post.User.photo === null &&
                post.User.id === $store.state.user.id
                "
              />
            </v-avatar>
            <div class="mt-3">
              <span class="username text-left ml-5">{{ post.User.username }}</span>
              <span class="date ml-5 text-left">{{
                post.createdAt | moment("calendar")
              }}</span>
            </div>
          </v-card-title>
          <div>
            <v-tooltip v-if="$store.state.user.id == post.User.id" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="modifier le post"
                  @click="getOnePost(post.id)"
                >
                  <v-icon class=" rounded-circle">$vuetify.icons.edit</v-icon>
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
            <v-tooltip
              v-if="
                $store.state.user.id === post.User.id ||
                $store.state.user.isAdmin === true
              "
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="supprimer le post"
                  @click="deletePost(post.id)"
                >
                  <v-icon small class=" rounded-circle">
                    $vuetify.icons.delete
                  </v-icon>
                </v-btn>
              </template>
              <span>Supprimer</span>
            </v-tooltip>
          </div>
        </div>
        <div class="pl-3 pr-2-3">
          <v-card-text class="text-left">
            <p class="body-1">
              {{ post.title }}
            </p>
            <p class="body-2">
              {{ post.message }}
            </p>
          </v-card-text>
        </div>
        <div class="pb-5">
          <v-img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            alt="lien posté par l'utilisateur"
            :max-height="300"
            :max-width="400"
            class="mx-auto pb-5"
          >
          </v-img>
        </div>
        <v-divider></v-divider>
        <div class="d-flex flex-column align-end pr-3">
          <div>{{ post.Comments.length }} commentaires</div>
        </div>
        <v-divider></v-divider>
        <v-card-actions class="pt-5  pr-4 d-flex justify-space-between">
          <div class=" d-flex justify-md-space-between">
            <v-btn @click="show = !show" text aria-label="accès commentaires">
              Commentaires
            </v-btn>
            <v-btn icon @click="show = !show" aria-label="accès commentaires">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <div class="comments-box d-flex flex-column justify-center">
              <v-card-text class="comment-input">
                <v-form
                  v-model="isValid"
                  @submit.prevent="onSubmitComment(post.id)"
                  enctype="multipart/form-data"
                  class="validate comment-form"
                >
                  <v-text-field
                    name="input-1-3"
                    label="ton commentaire"
                    v-model="data.commentMessage"
                    auto-grow
                    class="comment-form__message input-group--focused"
                  >
                  </v-text-field>
                  <v-btn
                    @click="onSubmitComment(post.id)"
                    :disabled="!isValid"
                    class="comment-form__btn"
                    aria-label="publier un message"
                    >Poster</v-btn
                  >
                </v-form>
                <div>
                  <div class="danger-alert" v-html="errorMessage" />
                  <div class="danger-alert" v-html="messageRetour" />
                </div>
              </v-card-text>
              <v-list
                v-for="comment in post.Comments"
                :key="comment.id"
                :comment="comment"
              >
                <v-list-item class="comment">
                  <v-list-item-avatar>
                    <img
                      v-if="comment.User.photo !== null"
                      :src="comment.User.photo"
                      alt="Photo de profil"
                    />
                    <v-icon
                      v-else-if="
                        comment.User.photo === null &&
                        comment.UserId === $store.state.user.id
                      "
                      color="pink"
                      size="32px"
                      role="avatar"
                      />
                  </v-list-item-avatar>

                  <v-list-item-content class="d-flex ">
                    <strong
                      v-html="comment.User.username"
                      class="pr-5 text-left  username"
                    ></strong>
                    <span
                      v-html="comment.message"
                      class=" text-left"
                    ></span>
                  </v-list-item-content>

                  <v-tooltip bottom>
                    <template
                      v-if="
                        $store.state.user.id === comment.UserId ||
                        $store.state.user.isAdmin === true
                      "
                      v-slot:activator="{ on, attrs }"
                    >
                      <v-btn fab primary x-small v-bind="attrs" v-on="on">
                        <v-icon
                          @click="deleteComment(comment.id)"
                          class=" rounded-circle "
                          aria-label="supprimer commentaire"
                          >$vuetify.icons.delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Supprimer</span>
                  </v-tooltip>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </div>
          </div>
        </v-expand-transition>
      </div>
    </v-card>
</template>

<script>
import PostsService from "../services/PostsService";
export default {
  name: "Posts",
  props: {
    post: {
      type: Object,
    },
  },
  data: function() {
    return {
      show: false,
      width: 500,
      commentForm: false,
      user: false,
      showWall: true,
      update: false,
      isValid: true,
      rules: {
        required: (value) => !!value || "Required.",
      },
      messageRetour: null,
      errorMessage: null,
      data: {
        commentMessage: "",
        commentUsername: this.$store.state.user.username,
      },
    };
  },
  methods: {
    async reloadWall() {
      try {
        const response = await PostsService.getAllPosts();
        this.posts = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    getUserProfile(id) {
      this.$router.push(`/accounts/${id}`);
    },
    deletePost() {
      this.$emit("deletePost", this.post.id);
    },
    getOnePost(id) {
      this.$router.push(`posts/${id}`);
    },
    onSubmitComment(id) {
      this.$store.dispatch("getAllPosts");
      this.$store.dispatch("addComment", {
        id: id,
        data: this.data,
      });
      this.data.commentMessage = "";
      this.$store.dispatch("getAllPosts");
      this.$store.dispatch("getPostById", this.post.id);
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id), this.reloadWall();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>