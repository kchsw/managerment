import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import instance from "./http.js"



Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
	const token = sessionStorage.getItem('TOKEN', token)
	if(to.path =="/login" || to.path =="/register"){
		token ? next("/home") : next()
	}else{
		token ? next() : next("/login")
	}
})

Vue.prototype.$axios = instance
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
