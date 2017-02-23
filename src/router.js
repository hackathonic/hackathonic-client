import VueRouter from 'vue-router';

import Auth from './components/Auth.vue';
import Hackathons from './components/Hackathons.vue';

export default {
  mode: 'history',
  routes: [
    {
      path: '/auth/github/callback',
      component: Auth,
      props: true
    },
    {
      path: '/signin',
      component: Auth
    },
    {
      path: '/',
      component: Hackathons
    }
  ]
};
