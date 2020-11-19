import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify';
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'
//import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.use(Vuetify);
//sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')