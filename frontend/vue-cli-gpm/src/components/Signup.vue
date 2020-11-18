<template>
    <v-layout column>
        <v-flex>
                <form class="format">
                    <v-text-field
                        label="username"
                        v-model="username"
                        type="text">
                    </v-text-field>
                    <v-text-field
                        label="email"
                        v-model="email"
                        type="email">
                    </v-text-field>
                    <v-text-field
                        label="password"
                        type="password"
                        v-model="password"
                        autocomplete="new-password">
                    </v-text-field>
                </form>
                <br>
                    <v-btn
                        dark
                        class="cyan"
                        @click="signup">
                        Inscription
                    </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      username: '',  
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async signup () {
      try {
        const response = await AuthenticationService.signup({
          username: this.username,  
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push("/")
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style lang="scss">
    .format {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin: auto;
        width: 700px;
        padding-top: 50px;
    }
    .cyan {
        display: flex;
        text-align: center;
        margin: auto;
    }
</style> 