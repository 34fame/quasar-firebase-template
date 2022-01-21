<template>
   <div class="q-mt-lg row justify-between items-center">
      <div class="row q-gutter-sm">
         <!--Add Button-->
         <button-regular
            v-if="actions.create"
            color="primary"
            icon="add"
            :label="$q.screen.gt.xs ? 'create' : ''"
            :round="$q.screen.lt.sm"
            size="sm"
            :to="{ name: `${module}-create` }"
         />

         <!--View Button-->
         <button-regular
            v-if="selected.length === 1 && actions.view"
            class="shadow-1"
            color="primary"
            icon="preview"
            :label="$q.screen.gt.xs ? 'open' : ''"
            outline
            :round="$q.screen.lt.sm"
            size="sm"
            :to="{
               name: `${module}-view`,
               params: { id: selected.length ? selected[0].id : null },
            }"
         />

         <!--Edit Button-->
         <button-regular
            v-if="selected.length === 1 && actions.update"
            class="shadow-1"
            color="primary"
            icon="edit_note"
            :label="$q.screen.gt.xs ? 'update' : ''"
            outline
            :round="$q.screen.lt.sm"
            size="sm"
            :to="{
               name: `${module}-update`,
               params: { id: selected.length ? selected[0].id : null },
            }"
         />

         <!--Delete Button-->
         <button-regular
            v-if="selected.length > 0 && actions.delete"
            class="shadow-1"
            color="negative"
            icon="delete_forever"
            :label="$q.screen.gt.xs ? 'delete' : ''"
            outline
            :round="$q.screen.lt.sm"
            :loading="deleting"
            size="sm"
            @click="handleDelete"
         />
      </div>
   </div>
</template>

<script>
export default {
   props: {
      selected: {
         type: Array,
         required: true,
      },
   },

   data() {
      return {
         deleting: false,
      }
   },

   computed: {
      module() {
         let module
         this.$router.currentRoute.matched.some((route) => {
            if (route.meta.module) module = route.meta.module
         })
         return module ? module : this.$route.name.split('-')[0]
      },

      actions() {
         return this.$appConfig.moduleFormActions(this.module)
      },
   },

   methods: {
      handleDelete() {
         this.$q
            .dialog({
               component: () => import('src/components/dialogs/ConfirmDelete.vue'),
               parent: this,
            })
            .onOk(() => {
               try {
                  this.selected.map(async (item) => {
                     await this.$axios.delete(`/${this.module}/${item.id}`)
                     this.$emit('selected', [])
                  })
               } catch (error) {
                  console.error('CreateForm', 'onSubmit', error)
               }
            })
            .onCancel(() => {})
            .onDismiss(() => {})
      },
   },

   components: {
      ButtonRegular: () => import('components/buttons/ButtonRegular.vue'),
   },
}
</script>

<style scoped></style>
