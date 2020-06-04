import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http'
import store from './store/index'


//  把axios写到vue的原型链上
Vue.prototype.$axios = axios;


Vue.config.productionTip = false
Vue.use(ElementUI);




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
