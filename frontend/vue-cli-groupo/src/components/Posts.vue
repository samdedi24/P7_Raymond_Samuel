<template>
    <v-layout>
        <v-flex>
            <panel title="Toutes l'actualités du moment !">

                <v-btn
                    slot="action"
                    @click="navigateTo({name: 'message-create'})"
                    light
                    medium
                    absolute
                    right
                    midlle>
                    Créer un article
                </v-btn>

                <div v-for="message in messages" class="message" :key="message.id">
                    
                    <v-layout>
                        <v-flex xs6>
                            <div class="message-title">
                                {{message.title}}
                            </div>
                            <div class="message-content">
                                {{message.message}}
                            </div>
                            <div class="message-attachment">
                                {{message.imageUrl}}
                            </div>                    
                        </v-flex>
                    </v-layout>
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import PostsService from '@/services/PostsService'
import Panel from '@/components/Panel'
export default {
   components: {
       Panel
   },
   data () {
       return {
           messages: null
       }
   },
   methods: {
       navigateTo (route) {
           this.$router.push(route)
       }
   },
   async mounted () {
       this.messages = (await PostsService.getAllPosts()).data
   }
}
</script>

<style scoped>
    .message {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-top: 25px;
        width: 600px;
        box-shadow: 2px 4px 5px 1px rgba(0, 0, 0, 0.3);
    }
    .message-title {
        display: flex;
        font-size: 24x;
        padding: 5px;
    }
    .message-content{
        display: flex;
        text-align: center;
        height: auto;
        padding: 8px;
    }
</style>>