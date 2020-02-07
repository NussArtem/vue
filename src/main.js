import App from './App.vue'
import Vue from 'vue'
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store/store'
import router from './router'
import VueCookies from 'vue-cookies'


Vue.use(BootstrapVue)
Vue.use(Vuex);
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.$cookies.config('7d')
new Vue({
    render: h => h(App),
    store,
    router,


}).$mount('#app')
