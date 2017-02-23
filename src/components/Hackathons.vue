<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Hackathons',
  created: function () {
    this.$store.dispatch('fetchHackathons');
  },
  computed: {
      ...mapGetters([
      'hackathons',
      'hackathonsCount',
      'loading'
    ])
  }
};
</script>

<template>
  <section>
    <h2>Hackathons</h2>
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <p v-if="hackathonsCount === 0">No hackathons were found</p>
      <ul>
        <li v-for="hackathon in hackathons">
          <a :href="`/hackathon/${hackathon.id}`">
            <h3>{{hackathon.name}}</h3>
            <time :datetime="hackathon.startDate">{{hackathon.startDate}}</time>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
