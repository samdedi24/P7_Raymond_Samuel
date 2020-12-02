<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title>
                    <h1>Actualités</h1>
                    <v-btn
                        @click="navigateTo({name: 'message-create'})"
                        light
                        medium
                        right
                        midlle>
                        Créer un article
                    </v-btn>
                </v-card-title>
                <div v-for="post in posts" class="message" :key="post.id">
                    <v-card class="post-align">
                        <p>{{ post.User.username }}</p>
                        <div class="message-title">
                            <p>{{ post.title }}</p>
                        </div>
                        <div class="message-content">
                            <p>{{ post.message }}</p>
                        </div>
                        <div class="message-attachment">
                            {{ post.imageUrl }}
                        </div>                  
                    </v-card>
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
//import PostsService from '@/services/PostsService'
export default {
    name: "Posts",
    computed: {
        posts() {
            return this.$store.getters.posts;
        }
    },
    data () {
       return {
         user: null,  
         errorMessage: null,
       }
    },
    beforeMount() {
    this.$store.dispatch("getAllPosts");
    },
    methods: {
       navigateTo (route) {
           this.$router.push(route)
       },
       getUserProfile(id) {
            this.$router.push(`/accounts/${id}`);
       },
       getOnePost(id) {
            this.$router.push(`posts/${id}`);
       },
    },
}
</script>

<style scoped>
</style>