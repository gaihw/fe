import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import VueAxios from 'vue-axios';
import axios from 'axios'
// import Router from 'vue-router'
// Vue.use(Router)

Vue.use(ElementUI);
Vue.prototype.$http= axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


