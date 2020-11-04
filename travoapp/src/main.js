import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router';
import Toastr from 'vue-toastr';

Vue.config.productionTip = false

Vue.use(Toastr);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
