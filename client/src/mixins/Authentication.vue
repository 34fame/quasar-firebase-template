<script>
export default {
   name: 'Authentication',

   methods: {
      async initSession(authUser) {
         const snapshot = await this.$firestore
            .collection('users')
            .where('email', '==', authUser.email)
            .get()
         if (snapshot.empty) {
            // User needs to exist for mobile app
            throw new Error('User not found')
         }

         const profile = snapshot.docs[0].data()
         this.$storage.set('isAuthenticated', true)
         this.$storage.set('profile', profile)

         await this['users/bind']()
         await this['users/setActiveUser'](profile.id)

         this.$axios.defaults.headers.common.keeperrx_userid = profile.id
         this.$axios.defaults.headers.common.keeperrx_tenantid = profile.tenantId
         this.$axios.defaults.headers.common.keeperrx_email = profile.email
         this.$axios.defaults.headers.common.keeperrx_role = profile.role

         const route = this.$route.name
         console.log('route', route)
         if (route === 'anonymous' || route === 'login') {
            return this.$router.push({ name: 'home' })
         }
      },
   }
}
</script>
