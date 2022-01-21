<template>
   <q-input
      :data-cy="label"
      :readonly="readonly"
      :rules="['date']"
      :value="value"
      :label="$t(label)"
      mask="date"
      stack-label
      style="width: 320px; max-width: 95%"
      filled
   >
      <template v-slot:append>
         <q-icon v-if="!readonly" name="event" class="cursor-pointer" data-cy="icon">
            <q-popup-proxy
               ref="qDateProxy"
               transition-show="scale"
               transition-hide="scale"
            >
               <q-date :value="value" @input="(val) => $emit('update', val)">
                  <div class="row items-center justify-end">
                     <q-btn v-close-popup label="Close" color="primary" flat data-cy="close" />
                  </div>
               </q-date>
            </q-popup-proxy>
         </q-icon>
      </template>
   </q-input>
</template>

<script>
export default {
   name: 'FieldInput',

   props: {
      value: {
         type: String,
         default: null,
      },
      label: {
         type: String,
         required: true,
      },
      readonly: {
         type: Boolean,
         default: false,
      },
   },
}
</script>

<style></style>
