<template>
    <div>
        <v-card>
            <v-flex xs6>
                <v-text-field
                    label="Titre"
                    required
                    :rules="[required]"
                    v-model="message.title">
                </v-text-field>

                <v-text-field
                    label="Lien ou image"
                    v-model="message.imageUrl">
                </v-text-field>
            </v-flex>
            <v-flex lg2>
                <v-text-field
                    label="Contenu"
                    required
                    large
                    v-model="message.message">
                </v-text-field>
            </v-flex>

            <v-btn
                dark
                class="cyan"
                @click="createPost">
                Envoyer l'article
            </v-btn>
        </v-card>

        <div class="error" v-if="error">
            {{error}}
        </div>
    </div>
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