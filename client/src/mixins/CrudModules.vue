<script>
import { mapGetters } from 'vuex'

export default {
   name: 'CrudModules',

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
      ...mapGetters(['users/all']),

      module() {
         let module
         this.$router.currentRoute.matched.some((route) => {
            if (route.meta.module) module = route.meta.module
         })
         return module ? module : this.$route.name.split('-')[0]
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
      ListHeader: () => import('components/list/ListHeader.vue'),
      ListActions: () => import('components/list/ListActions.vue'),
      ListTable: () => import('components/list/ListTable.vue'),
   },
}
</script>
