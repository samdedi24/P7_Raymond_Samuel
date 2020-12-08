<template>
    <v-container fluid class="create-container">
        <v-card flat dense class="d-flex flex-column mx-auto">
            <v-flex auto xs6>
                <v-card-title flat dense class="mr-3">
                    <v-text-field
                        label="Titre"
                        required
                        :rules="[required]"
                        v-model="message.title">
                    </v-text-field>
                </v-card-title>
                <v-card flat class="mr-4">
                    <v-text-field
                        label="Lien ou image"
                        v-model="message.imageUrl">
                    </v-text-field>
                </v-card> 
                <v-card flat class="mr-4"> 
                    <v-text-field
                        label="Contenu"
                        required
                        :rules="[required]"
                        v-model="message.message">
                    </v-text-field>
                </v-card>      
                </v-flex>
            <v-btn
                dark
                class="cyan"
                @click="createPost">
                Envoyer l'article
            </v-btn>
        </v-card>
    </v-container>    
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
    data () {
        return {
            message: {
                title: null,
                message: null,
                imageUrl: null
            },
            error: null,
            required: (value) => !!value || 'Requis.'
        }
    },
    methods: {
        async createPost () {
            this.error = null
            const areAllFieldsFilledIn = Object
                .keys(this.message)
                .every(key => !!this.message[key])
              if (!areAllFieldsFilledIn) {
                  this.error = 'Rentrer touts les champs requis.'
                  return
              }
            try {
                await PostsService.createPost(this.message)
                this.$router.push("/all")
            } catch (err) {
                console.log(err)
            }
        }
    },

}
</script>

<style scoped>
    
</style> 