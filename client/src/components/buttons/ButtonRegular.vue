<template>
   <q-btn
      :class="_class"
      :color="color"
      :data-cy="label"
      :icon="icon"
      :label="$t(label)"
      :loading="loading"
      :outline="outline"
      :round="round"
      :size="size"
      :to="to"
      @click="$emit('click')"
   />
</template>

<script>
export default {
   name: 'ButtonRegular',

   props: {
      _class: {
         type: String,
         default: '',
      },
      color: {
         type: String,
         default: 'primary',
      },
      icon: {
         type: String,
      },
      label: {
         type: String,
      },
      outline: {
         type: Boolean,
         default: false,
      },
      round: {
         type: Boolean,
         default: false,
      },
      loading: {
         type: Boolean,
         default: false,
      },
      size: {
         type: String,
         default: 'md',
      },
      to: {
         type: Object,
      },
   },
}
</script>

<style></style>
