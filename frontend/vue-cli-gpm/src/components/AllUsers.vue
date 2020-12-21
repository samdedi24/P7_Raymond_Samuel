<template>
  <v-container fluid class="signup-container">
    <div class="account"> 
      <v-layout v-if="$store.state.users" row class="account-box">
        <v-card
          v-for="user of users"
          :key="user.id"
          :user="user"
          class="users"
          elevation="4"
        >
          <div class="d-flex justify-space-between">
            <v-card-title flat dense dark>
              <v-avatar size="32px" class="mt-0">
                <img
                  v-if="user.photo"
                  :src="user.photo"
                  alt="Photo de profil"
                />
              </v-avatar>
              <div class="d-flex flex-column">
                <div>
                  <strong class="username">Prénom : </strong
                  ><span>{{ user.username }}</span>
                </div>
                <div>
                  <strong>Email : </strong><span>{{ user.email }}</span> <br>
                  <strong>Bio : </strong><span>{{ user.bio }}</span>
                </div>
              </div>
            </v-card-title>
            <div>
            
              <v-tooltip
                v-if="
                    ($store.state.user.isAdmin === true)
                "
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="delete-btn"
                    @click="deleteUser(user.id)"
                    fab
                    primary
                    x-small
                    v-bind="attrs"
                    v-on="on"
                    aria-label="supprimer le compte"
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
        </v-card>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AllUsers",
  data() {
    return {      
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }    
  },
  beforeMount() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    getBack() {
      this.$router.push("/");
    },
    deleteUser(id) {     
      if(this.$store.state.user.admin === true) {
        this.$store.dispatch("deleteUser", id);
      }
      else {
        this.$store.dispatch("deleteUser", id);
      }
    },
  },
};
</script>


<style scoped lang="scss">
.account {
  display: flex;
  flex-direction: column;
}
</style>