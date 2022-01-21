<template>
   <q-list>
      <div v-for="module in $appConfig.leftMenu" :key="module.id">
         <q-item-label header>{{ $t(module.label) }}</q-item-label>
         <div v-for="item in module.children" :key="item.label">
            <q-item
               clickable
               v-close-popup
               active-class="active-border text-secondary"
               :to="item.route"
            >
               <q-item-section avatar>
                  <q-icon :name="item.icon" />
               </q-item-section>
               <q-item-section>
                  <q-item-label>{{ $t(item.label) }}</q-item-label>
               </q-item-section>
            </q-item>
         </div>
      </div>
   </q-list>
</template>

<script>
export default {
   name: 'ModulesMenu',
}
</script>

<style lang="sass" scoped>
.active-border
   border-left: 4px solid $secondary
</style>
