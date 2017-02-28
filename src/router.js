import VueRouter from 'vue-router';

import Auth from './components/Auth.vue';
import Hackathons from './components/Hackathons.vue';
import HackathonCreator from './components/HackathonCreator.vue';
import HackathonDetails from './components/HackathonDetails.vue';

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
    },
    {
      path: '/hackathon/create',
      component: HackathonCreator
    },
    {
      name: 'hackathon',
      path: '/hackathon/:hackathonId',
      component: HackathonDetails
    }
  ]
};
