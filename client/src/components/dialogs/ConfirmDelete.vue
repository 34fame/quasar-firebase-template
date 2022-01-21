<template>
   <q-dialog ref="confirm" @hide="onHide">
      <q-card style="width: 300px">
         <q-card-section>
            <q-item-label header>
               {{ $t('confirmdelete') }}
            </q-item-label>
         </q-card-section>
         <q-card-actions>
            <div class="row q-gutter-sm">
               <button-regular
                  color="negative"
                  icon="delete_forever"
                  label="confirm"
                  no-caps
                  size="sm"
                  @click="onOk"
               />

               <button-regular
                  color="primary"
                  icon="close"
                  label="cancel"
                  outline
                  no-caps
                  size="sm"
                  @click="onCancel"
               />
            </div>
         </q-card-actions>
      </q-card>
   </q-dialog>
</template>

<script>
export default {
   name: 'ConfirmDelete',

   methods: {
      show() {
         this.$refs.confirm.show()
      },
      hide() {
         this.$refs.confirm.hide()
      },
      onCancel() {
         this.hide()
         this.$emit('cancel')
      },
      onHide() {
         this.$emit('hide')
      },
      async onOk() {
         this.$emit('ok')
         this.hide()
      },
   },

   components: {
      ButtonRegular: () => import('components/buttons/ButtonRegular.vue'),
   },
}
</script>

<style></style>
