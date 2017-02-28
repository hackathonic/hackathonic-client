<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Hackathons',
  created: function () {
    this.$store.dispatch('fetchHackathon', this.$route.params.hackathonId);
  },
  computed: {
      ...mapGetters([
      'selectedHackathon',
      'loading'
    ])
  }
};
</script>

<template>
  <section>
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <p v-if="!selectedHackathon">No hackathon was found</p>
      <div v-else>
        <h2>{{selectedHackathon.name}}</h2>
        <time :datetime="selectedHackathon.startDate">{{selectedHackathon.startDate}}</time>
      </div>
    </div>
  </section>
</template>
