<template>
   <div id="q-app">
      <router-view />
   </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   name: 'App',

   methods: {
      ...mapActions(['users/bind', 'roles/bind', 'events/bind']),
   },

   created() {
      this['users/bind']()
      this['roles/bind']()
      this['events/bind']()
   },
}
</script>
