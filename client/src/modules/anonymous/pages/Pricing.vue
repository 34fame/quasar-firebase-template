<template>
   <q-page class="flex flex-center">
      <div class="column q-gutter-y-lg">
         <q-img src="~assets/undraw_under_construction.svg" width="300px" />
         <q-btn
            color="primary"
            outline
            :label="$t('goback')"
            no-caps
            :to="{ name: 'public' }"
         />
      </div>
   </q-page>
</template>

<script>
export default {
   name: 'Pricing',
}
</script>

<style></style>
