<template>
   <q-page class="text-primary" :class="$q.screen.gt.sm ? 'q-pa-lg' : 'q-pa-md'">
      <div class="q-pa-y-md q-gutter-sm">
         <q-breadcrumbs active-color="secondary">
            <q-breadcrumbs-el :label="$t('home')" icon="home" :to="{ name: 'home' }" />
            <q-breadcrumbs-el
               :label="$t(module)"
               :icon="config.icon"
               :to="config.route"
            />
         </q-breadcrumbs>
      </div>

      <div class="q-mt-md">
         <span class="text-h5">{{ $t(module) }}</span>
         <q-separator />
      </div>

      <router-view />
   </q-page>
</template>

<script>
export default {
   name: 'Settings',

   computed: {
      module() {
         return this.$route.name
      },

      config() {
         return this.$appConfig.config.settings.children[this.module].menu
      },
   },
}
</script>

<style></style>
