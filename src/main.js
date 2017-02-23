import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  el: '#app',
  render: h => h(App),
  router: new VueRouter(router),
  store: new Vuex.Store(store)
});
