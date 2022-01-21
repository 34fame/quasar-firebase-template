<template>
   <q-layout view="hHh Lpr lFf">
      <q-drawer
         content-class="bg-primary text-accent"
         :mini="mini"
         v-model="leftDrawer"
         :width="200"
      >
         <global-search />
         <modules-menu />
      </q-drawer>

      <q-page-container>
         <router-view />
      </q-page-container>

      <footer-menu />
   </q-layout>
</template>

<script>
export default {
   name: 'MainLayout',
   data() {
      return {
         leftDrawer: this.$q.screen.lt.md ? false : true,
         mini: false,
      }
   },

   watch: {
      '$q.screen': {
         handler(value) {
            // The drawer was not re-appearing when going from
            // big to small and back to big.  This watch seems
            // to have resolved that.
            this.leftDrawer = value.lt.md ? false : true
         },
         deep: true,
      },
   },

   components: {
      GlobalSearch: () => import('components/search/GlobalSearch.vue'),
      ModulesMenu: () => import('components/menus/ModulesMenu.vue'),
      FooterMenu: () => import('components/menus/FooterMenu.vue'),
   },
}
</script>
