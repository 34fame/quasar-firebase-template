<template>
   <div class="row justify-start items-center q-gutter-md">
      <q-select
         color="primary"
         dense
         :disable="filterGroupOptions.length <= 1"
         emit-value
         filled
         map-options
         :options="filterGroupOptions"
         style="width: 300px"
         :value="filterGroup"
         @input="(value) => $emit('filterGroupInput', value)"
      />

      <q-input
         dense
         filled
         style="width: 300px"
         :value="filterText"
         @input="(value) => $emit('filterTextInput', value)"
      >
         <template v-slot:append>
            <q-icon color="grey-5" name="filter_alt" size="xs" />
            <q-icon
               v-if="filterText.length"
               class="cursor_pointer"
               color="grey-5"
               name="cancel"
               size="xs"
               @click="$emit('filterTextInput', '')"
            />
         </template>
      </q-input>
   </div>
</template>

<script>
export default {
   props: {
      filterText: {
         type: String,
         require: true,
      },
      filterGroup: {
         type: String,
         require: true,
      },
   },

   computed: {
      module() {
         let module
         this.$router.currentRoute.matched.some((route) => {
            if (route.meta.module) module = route.meta.module
         })
         return module ? module : this.$route.name.split('-')[0]
      },

      filterGroupOptions() {
         let options = this.$appConfig.config.modules.children[this.module]
            .filterGroupOptions
         options = options.map((option) => {
            return {
               ...option,
               label: this.$t(option.label),
            }
         })
         return options
      },
   },

   watch: {
      filterGroup: function (value) {
         console.log('filterGroup', value)
      },
   },
}
</script>

<style></style>
