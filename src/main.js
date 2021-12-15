import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'




import Notifications from 'vue-notification'

import Factories from './components/Factories.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import i18n from './components/plugins/Language/i18n'



/************************************************************/
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
/*import { BootstrapVue, IconsPlugin, DropdownPlugin, TablePlugin, VBScrollspyPlugin, CardPlugin, ModalPlugin, LayoutPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
Vue.use(VBScrollspyPlugin)
Vue.use(CardPlugin)
Vue.use(ModalPlugin)
Vue.use(LayoutPlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)*/
Vue.use(VueRouter)
Vue.use(Notifications)

const router = new VueRouter({
  routes: [
    { path: "/", component: Login },
    { path: "/register", component: Register },
    { path: "/factories", component: Factories },
  ],
  mode: 'history'
})



Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  i18n,
  router
}).$mount('#app')
