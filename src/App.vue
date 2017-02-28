<script>
import * as auth from './auth';
export default {
  name: 'app',
  components:  {},
  data: () => {
    return {
      signedIn: auth.isAuthenticated()
    }
  },
}
</script>

<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">List of hackathons</router-link></li>
        <li><router-link to="/hackathon/create">Create a hackathon</router-link></li>
        <li v-if="!signedIn"><router-link to="/signin">Sign in with github</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
</style>
