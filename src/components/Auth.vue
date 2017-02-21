<template>
  <div>Authenticating&elipsis;</div>
</template>

<script>
import router from '../router';
import * as auth from '../auth';

export default {
  name: 'Auth',
  created: function () {
    const { code } = this.$route.query;
    if (code) {
      auth.getAccessToken(code).then(access_token => {
        if (access_token) {
          auth.ensureAccount(access_token).then(() => {
            auth.setToken(access_token);
            router.replace('/');
          })
        } else {
          router.replace('/error/signin');
        }
      });
    } else if (!auth.isAuthenticated()) {
      auth.signIn();
    } else {
      router.replace('/');
    }
  }
}
</script>
