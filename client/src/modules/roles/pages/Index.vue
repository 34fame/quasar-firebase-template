<template>
   <crud-module>
      <router-view />
   </crud-module>
</template>

<script>
import CrudModules from 'src/mixins/CrudModules'
import config from '../index'

export default {
   name: 'UsersIndex',

   data() {
      return {
         data: [],
         filter: '',
         filterText: '',
         filterGroup: '',
         selected: [],
         config,
      }
   },

   mixins: [CrudModules],

   components: {
      CrudModule: () => import('components/CrudModule.vue'),
   },
}
</script>

<style lang="sass" scoped></style>
