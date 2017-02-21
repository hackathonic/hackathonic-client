<script>
import axios from 'axios';
import * as auth from '../auth';
export default {
  name: 'Home',
  created: function () {
    this.fetch();
  },
  data: () => {
    return {
      signedIn: auth.isAuthenticated(),
      loading: true,
      hackathons: []
    }
  },
  methods: {
    formatDate(date) {
      return date;
    },
    fetch: function () {
      axios.get(`/api/v1/hackathon`)
        .then(response => {
          this.loading = false;
          this.hackathons = response.data;
        });
    }
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
