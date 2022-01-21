<template>
   <q-input
      :data-cy="label"
      :value="value"
      :label="$t(label)"
      stack-label
      style="width: 320px; max-width: 95%"
      filled
      :readonly="readonly"
      @input="(val) => $emit('update', val)"
   />
</template>

<script>
export default {
   name: 'FieldInput',

   props: {
      value: {
         type: String | Number,
         default: '',
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
