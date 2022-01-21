<template>
   <div class="q-pa-md">
      <q-input
         autocorrect="off"
         autocapitalize="off"
         autocomplete="off"
         spellcheck="false"
         :debounce="500"
         input-class="text-right"
         ref="search"
         color="accent"
         dark
         dense
         outlined
         v-model="searchString"
      >
         <template v-slot:prepend>
            <q-spinner :color="!!loading ? 'primary' : 'transparent'" />
         </template>
         <template v-slot:append>
            <q-icon v-if="searchString === ''" name="search" />
            <q-icon
               v-else
               name="clear"
               class="cursor-pointer"
               @click="searchString = ''"
            />
         </template>
         <q-menu no-focus ref="searchResultsMenu">
            <q-list bordered separator>
               <template v-if="searchResults.length">
                  <q-item v-for="item in searchResults" :key="item.id" v-close-popup>
                     <search-result :item="item" />
                  </q-item>
               </template>
               <template
                  v-if="!!!loading && searchString.length && !searchResults.length"
               >
                  <q-item>
                     <q-item-section>
                        <q-item-label>No matches found</q-item-label>
                     </q-item-section>
                  </q-item>
               </template>
            </q-list>
         </q-menu>
      </q-input>
   </div>
</template>

<script>
export default {
   name: 'GlobalSearch',
   data() {
      return {
         searchString: '',
         loading: false,
         searchResults: [],
      }
   },
   methods: {
      async search() {
         try {
            this.loading = true
            // const profile = storage.getItem('profile')
            // const payload = {
            //    userId: profile.id,
            //    searchString: this.searchString,
            // }
            // const results = await this.$axios.post('/search', payload)
            // this.searchResults = results.data.data ? results.data.data : []
         } catch (error) {
            console.error(`Search error: ${error}`)
            this.searchResults = []
         } finally {
            this.loading = false
         }
      },
   },
   watch: {
      searchString: function (value) {
         if (!value.length) {
            this.searchResults = []
         } else {
            this.search()
         }
      },
   },

   components: {
      SearchResult: () => import('components/search/SearchResult.vue'),
   },
}
</script>

<style></style>
