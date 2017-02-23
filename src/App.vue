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
        <li><a href="/">List of hackathons</a></li>
      </ul>
    </nav>
    <div v-if="signedIn">
      <router-view></router-view>
    </div>
    <div v-else>
      <router-link to="/signin">Sign in with github</router-link>
    </div>
  </div>
</template>

<style lang="scss">
</style>
