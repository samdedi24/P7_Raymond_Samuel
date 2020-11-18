<template>
 <div id="app">
    <v-app>
      <page-header />

      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from './components/Header.vue';

export default {
  name: 'App',

  components: {
    PageHeader,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1px;
}
.danger-alert {
  color: red;
}
</style> 