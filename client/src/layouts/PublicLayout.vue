<template>
   <q-layout view="hHh Lpr lFf">
      <q-header class="bg-white text-primary">
         <q-toolbar>
            <q-toolbar-title>
               <div class="row q-gutter-x-sm">
                  <q-icon name="apps" size="md" />
                  <div class="text-h6">
                     {{ $t('appname') }}
                  </div>
               </div>
            </q-toolbar-title>
            <div
               v-if="$q.screen.gt.sm"
               class="row justify-end items-center q-gutter-x-sm"
            >
               <q-btn flat :label="$t('products')" no-caps :to="{ name: 'products' }" />
               <q-btn flat :label="$t('learnmore')" no-caps :to="{ name: 'learn' }" />
               <q-btn flat :label="$t('pricing')" no-caps :to="{ name: 'pricing' }" />
               <q-separator color="primary" vertical />
               <q-btn
                  v-if="!isAuthenticated"
                  flat
                  :label="$t('login')"
                  no-caps
                  :to="{ name: 'login' }"
               />
               <q-btn
                  v-if="!isAuthenticated"
                  flat
                  :label="$t('signup')"
                  no-caps
                  :to="{ name: 'login' }"
               />
               <q-btn
                  v-if="isAuthenticated"
                  flat
                  :label="$t('logout')"
                  no-caps
                  :to="{ name: 'logout' }"
               />
               <q-btn
                  v-if="isAuthenticated && isAnonymous"
                  flat
                  :label="$t('signup')"
                  no-caps
                  :to="{ name: 'signup' }"
               />
               <q-btn
                  v-if="isAuthenticated && !isAnonymous"
                  flat
                  :label="$t('launch')"
                  no-caps
                  :to="{ name: 'home' }"
               />
            </div>

            <div v-if="$q.screen.lt.md">
               <q-icon name="more_vert" size="md">
                  <q-menu>
                     <q-list>
                        <q-item clickable :to="{ name: 'products' }">
                           <q-item-label>{{ $t('products') }}</q-item-label>
                        </q-item>
                        <q-item clickable :to="{ name: 'learn' }">
                           <q-item-label>{{ $t('learnmore') }}</q-item-label>
                        </q-item>
                        <q-item clickable :to="{ name: 'pricing' }">
                           <q-item-label>{{ $t('pricing') }}</q-item-label>
                        </q-item>
                        <q-item v-if="isAuthenticated" clickable :to="{ name: 'logout' }">
                           <q-item-label>{{ $t('logout') }}</q-item-label>
                        </q-item>
                        <q-item v-if="!isAuthenticated" clickable :to="{ name: 'login' }">
                           <q-item-label>{{ $t('login') }}</q-item-label>
                        </q-item>
                        <q-item
                           v-if="isAnonymous"
                           clickable
                           :to="{ name: 'loginsignup' }"
                        >
                           <q-item-label>{{ $t('signup') }}</q-item-label>
                        </q-item>
                        <q-item
                           v-if="isAuthenticated && !isAnonymous"
                           clickable
                           :to="{ name: 'home' }"
                        >
                           <q-item-label>{{ $t('launchapp') }}</q-item-label>
                        </q-item>
                     </q-list>
                  </q-menu>
               </q-icon>
            </div>
         </q-toolbar>
      </q-header>

      <q-page-container>
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script>
export default {
   name: 'PublicLayout',

   computed: {
      isAuthenticated() {
         return this.$storage.has('token')
      },

      isAnonymous() {
         let result = true
         if (this.$storage.has('profile')) {
            const profile = this.$storage.getItem('profile')
            result = profile.role === 'anonymous'
         }
         return result
      },
   },

   mounted() {},

   watch: {
      isAuthenticated: function (value) {
         console.log('isAuthenticated', value)
      },
   },
}
</script>
