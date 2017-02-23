<script>
import { mapGetters } from 'vuex'
import * as auth from '../auth';
export default {
  name: 'Home',
  created: function () {
    this.$store.dispatch('fetchHackathons');
  },
  data: () => {
    return {
      signedIn: auth.isAuthenticated()
    }
  },
  computed: {
      ...mapGetters([
      'hackathons',
      'loading'
    ])
  }
};
</script>

<template>
  <div v-if="signedIn">
    Hackathons
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <input type="search">
      <ul>
        <li v-for="hackathon in hackathons">
          <a :href="`/hackathon/${hackathon.id}`">
            <h3>{{hackathon.name}}</h3>
            <time :datetime="hackathon.startDate">{{formatDate(hackathon.startDate)}}</time>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <router-link to="/signin">Sign in with github</router-link>
  </div>
</template>
