<template>
   <transition
      appear
      enter-active-class="animated slideInRight faster"
      leave-active-class="animated slideOutLeft faster"
   >
      <q-page class="q-pa-lg text-primary">
         <list-header
            :filterText="filterText"
            :filterGroup="filterGroup"
            @filterGroupInput="onFilterGroupInput"
            @filterTextInput="onFilterTextInput"
         />
         <list-actions :selected.sync="selected" @selected="onSelected" />
         <list-table :filter="filter" :selected="selected" @selected="onSelection" />
      </q-page>
   </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   name: 'List',

   data() {
      return {
         data: [],
         filter: '',
         filterText: '',
         filterGroup: '',
         selected: [],
      }
   },

   computed: {
      ...mapGetters(['users/all', 'roles/all', 'events/all']),

      module() {
         return this.$route.name.split('-')[0]
      },
   },

   methods: {
      loadData() {
         this.data = this[`${this.module}/all`]
      },

      onFilterTextInput(value) {
         this.filterText = value
      },

      onFilterGroupInput(value) {
         this.filterGroup = value
      },

      onSelected(value) {
         this.selected = value
      },

      onSelection(value) {
         value.rows.map((row) => {
            if (value.added) {
               this.selected.push(row)
            } else {
               let index = this.selected.findIndex((f) => f.id === row.id)
               this.selected.splice(index, 1)
            }
         })
      },
   },

   watch: {
      filterText: function (value) {
         // Unable to combine drop-down and text filters
         // TODO
         this.filterGroup = ''
         this.filter = value.trim()
      },

      filterGroup: function (value) {
         // Unable to combine drop-down and text filters
         this.filterText = ''
         this.filter = value.trim()
      },
   },

   created() {
      this.loadData()
   },

   components: {
      ListHeader: () => import('../components/list/ListHeader.vue'),
      ListActions: () => import('../components/list/ListActions.vue'),
      ListTable: () => import('../components/list/ListTable.vue'),
   },
}
</script>

<style lang="sass" scoped></style>
