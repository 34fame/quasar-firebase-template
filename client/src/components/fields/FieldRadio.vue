<template>
   <div class="row q-gutter-sm">
      <q-radio
         v-for="option in options"
         :data-cy="option.label"
         :key="option.value"
         :value="model"
         :val="option.value"
         :label="$t(option.label)"
         :disable="readonly"
         @input="(v) => $emit('update', v)"
      />
   </div>
</template>

<script>
export default {
   name: 'FieldRadio',

   props: {
      model: {
         type: String,
         required: true,
      },
      readonly: {
         type: Boolean,
         default: false,
      },
      options: {
         type: Array,
         required: true,
      },
   },
}
</script>

<style></style>
