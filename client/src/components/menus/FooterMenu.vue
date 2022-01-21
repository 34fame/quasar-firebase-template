<template>
   <q-footer class="lt-md bg-primary text-accent" elevated>
      <div class="row justify-around no-wrap">
         <q-fab
            v-model="model[section.label]"
            v-for="(section, idx) in $appConfig.footerMenu"
            :key="section.label"
            :icon="section.icon"
            :vertical-actions-align="handleVerticalAlignment(idx)"
            color="primary"
            direction="up"
            text-color="accent"
            flat
            square
         >
            <q-fab-action
               v-for="item in section.children"
               :key="item.label"
               :icon="item.icon"
               :label="$t(item.label)"
               :to="item.route"
               color="secondary"
               label-position="right"
            />
         </q-fab>
      </div>
   </q-footer>
</template>

<script>
export default {
   name: 'FooterMenu',

   data() {
      return {
         model: {},
      }
   },

   computed: {
      fabMenu() {
         return this.$appConfig.footerMenu
      },
   },

   methods: {
      handleVerticalAlignment(idx) {
         const menuLength = this.$appConfig.footerMenu.length
         if (idx === 0) return 'left'
         if (idx === menuLength - 1) return 'right'
         return 'center'
      },
   },
}
</script>

<style></style>
