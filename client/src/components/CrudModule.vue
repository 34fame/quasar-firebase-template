<template>
   <q-page class="text-primary" :class="$q.screen.gt.sm ? 'q-pa-lg' : 'q-pa-md'">
      <div class="q-pa-y-md q-gutter-sm">
         <q-breadcrumbs active-color="secondary">
            <q-breadcrumbs-el :label="$t('home')" icon="home" :to="{ name: 'home' }" />
            <q-breadcrumbs-el
               :label="$t(module)"
               :icon="$appConfig.moduleMenu(module).icon"
               :to="$appConfig.moduleMenu(module).route"
            />
            <q-breadcrumbs-el
               v-if="$route.name === `${module}-view`"
               label="View"
               icon="preview"
            />
            <q-breadcrumbs-el
               v-if="$route.name === `${module}-create`"
               label="Create"
               icon="note_add"
            />
            <q-breadcrumbs-el
               v-if="$route.name === `${module}-update`"
               label="Edit"
               icon="edit_note"
            />
         </q-breadcrumbs>
      </div>

      <div class="q-mt-md">
         <span class="text-h5">{{ $t(module) }}</span>
         <q-separator />
      </div>

      <slot></slot>
   </q-page>
</template>

<script>
export default {
   name: 'CrudModule',

   computed: {
      module() {
         let module
         this.$router.currentRoute.matched.some((route) => {
            if (route.meta.module) module = route.meta.module
         })
         return module ? module : this.$route.name.split('-')[0]
      },
   },
}
</script>

<style></style>
