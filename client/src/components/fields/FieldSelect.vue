<template>
   <q-select
      :data-cy="label"
      :label="$t(label)"
      :options="options"
      :readonly="readonly"
      :value="value"
      @input="(val) => $emit('update', val)"
      emit-value
      map-options
      style="width: 320px; max-width: 95%"
      filled
      stack-label
   />
</template>

<script>
export default {
   name: 'FieldSelect',

   props: {
      value: {
         type: String | Number,
         default: '',
      },
      label: {
         type: String,
         required: true,
      },
      options: {
         type: Array,
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
