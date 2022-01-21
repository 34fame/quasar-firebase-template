<template>
   <div class="q-mt-lg row justify-center">
      <q-card style="width: 320px; max-width: 95%">
         <q-card-section class="column justify-center items-center">
            <q-img src="~assets/undraw_logo.png" width="220px" />
            <span class="text-h6">{{ $t('appname') }} v{{ appVersion }}</span>
            <span class="text-caption">{{ `${$t('by')} ${$t('company')}` }}</span>
         </q-card-section>
         <q-card-section>
            <div class="column">
               <q-btn
                  rounded
                  color="primary"
                  icon="fab fa-facebook"
                  :label="$t('visitcommunity')"
                  no-caps
                  @click="onFacebook"
               />
            </div>
         </q-card-section>
         <q-expansion-item v-model="expanded">
            <q-card-section>
               <div class="column text-body2 text-primary">
                  <span>{{ `Your device: ${device}` }}</span>
                  <span>{{ `Your operating system: ${os}` }}</span>
                  <span>{{ `Your browser: ${os}` }}</span>
                  <span>{{ `Your IP address: ${ip}` }}</span>
               </div>
            </q-card-section>
            <q-separator spaced inset />
            <q-card-section class="column justify-center items-center">
               <a href="https://www.34fame.com" target="_blank">
                  <q-img src="~assets/logo-transparent-4000x4000.png" width="120px" />
               </a>
            </q-card-section>
         </q-expansion-item>
      </q-card>
   </div>
</template>

<script>
import { Platform } from 'quasar'
import { version } from '../../../../package.json'

export default {
   name: 'About',

   data() {
      return {
         expanded: false,
         ip: '',
      }
   },

   computed: {
      appVersion() {
         return version
      },

      device() {
         if (Platform.is.desktop) return 'desktop/laptop'
         if (Platform.is.iphone) return 'iPhone'
         if (Platform.is.ipad) return 'iPad'
         if (Platform.is.kindle) return 'Kindle'
         if (Platform.is.android) return 'Android'
         if (Platform.is.blackberry) return 'Blackberry'
         if (Platform.is.mobile) return 'mobile/tablet'
         return 'unknown'
      },

      os() {
         if (Platform.is.win) return 'Windows'
         if (Platform.is.mac) return 'MacOS'
         if (Platform.is.linux) return 'Linux'
         if (Platform.is.ios) return 'iOS'
         if (Platform.is.cros) return 'Chrome OS'
         return 'unknown'
      },

      browser() {
         if (Platform.is.chrome) return 'Chrome'
         if (Platform.is.safari) return 'Safari'
         if (Platform.is.edge) return 'Edge'
         if (Platform.is.ie) return 'IE'
         if (Platform.is.silk) return 'Silk'
         if (Platform.is.opera) return 'Opera'
         if (Platform.is.electron) return 'Native App'
         if (Platform.is.cordova || Platform.is.capacitor) return 'Mobile App'
         return 'unknown'
      },

      userAgent() {
         return navigator.userAgent
      },
   },

   methods: {
      async getIpAddress() {
         const ip = await this.$axios.get('https://api.ipify.org')
         this.ip = ip.data ? ip.data : 'unknown'
      },

      onFacebook() {
         window.open('https://www.facebook.com/34fame', '_blank')
      },
      onCompanyLink() {
         window.open('https://www.34fame.com', '_blank')
      },
   },

   created() {
      this.getIpAddress()
   },
}
</script>

<style></style>
