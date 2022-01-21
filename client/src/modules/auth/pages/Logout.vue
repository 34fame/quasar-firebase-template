<template></template>

<script>
export default {
   name: 'Logout',

   async mounted() {
      this.$storage.clear()
      this.$router.push({ name: 'public' })
   },
}
</script>

<style></style>
