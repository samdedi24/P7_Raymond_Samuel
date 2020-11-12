<template>
    <div>
        <v-toolbar>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <slot name="action" />
        </v-toolbar>

        <div>
            <slot>Aucun article pour le moment</slot>
        </div>
    </div>
</template>

<script>
export default {
   props: [
       'title'
   ]
}
</script>