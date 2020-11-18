<template>
    <v-container>
        <v-card>
            <span> Bonjour {{ user.username }}</span>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "Account",
    data() {
        return {
            user: {
                username: null,
            }
        }
    },
}
</script>