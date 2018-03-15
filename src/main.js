// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import Less from 'less'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000';

Vue.use(elementui)
Vue.use(Less)
Vue.use(axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
