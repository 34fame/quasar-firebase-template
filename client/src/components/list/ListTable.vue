<template>
   <div class="q-mt-lg">
      <div class="q-mt-lg">
         <q-table
            ref="table"
            card-container-class="bg-primary text-accent"
            :columns="columns"
            :data="data"
            :dense="$q.screen.lt.sm"
            :filter="filter"
            :grid="$q.screen.xs"
            :hide-pagination="data.length <= tableRowsPerPage"
            :row-key="key"
            :rows-per-page-options="[tableRowsPerPage]"
            selection="multiple"
            :selected.sync="model"
            table-header-class="bg-secondary-dark text-accent"
            :visible-columns="visibleColumns"
            @row-click="onRowClick"
            @selection="(row) => $emit('selected', row)"
         />
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   name: 'ListTable',

   props: {
      filter: {
         type: String,
         default: '',
      },

      selected: {
         type: Array,
         required: true,
      },
   },

   data() {
      return {
         model: [],
         tableRowsPerPage: 50,
      }
   },

   computed: {
      ...mapGetters(['users/all', 'roles/all', 'events/all']),

      module() {
         let module
         this.$router.currentRoute.matched.some((route) => {
            if (route.meta.module) module = route.meta.module
         })
         return module ? module : this.$route.name.split('-')[0]
      },

      columns() {
         let columns = this.$appConfig.config.modules.children[this.module].table.columns
         columns = columns.map((col) => {
            return {
               ...col,
               label: this.$t(col.label),
            }
         })
         return columns
      },

      key() {
         return this.$appConfig.config.modules.children[this.module].table.key
      },

      visibleColumns() {
         return this.$appConfig.config.modules.children[this.module].table.visibleColumns
      },

      data() {
         return this[`${this.module}/all`]
      },
   },

   methods: {
      onRowClick(e, row) {
         let added = false
         let selected = this.$refs.table.isRowSelected(row.id)
         if (!selected) {
            added = true
         }
         this.$emit('selected', { rows: [row], added })
      },
   },

   watch: {
      selected: function (value) {
         this.model = value
      },
   },
}
</script>
