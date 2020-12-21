import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify';
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

const moment = require('moment')
require('moment/locale/fr')
Vue.use(require('vue-moment'), {
  moment
});
Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')