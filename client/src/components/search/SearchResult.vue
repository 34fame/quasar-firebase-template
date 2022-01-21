<template>
   <q-card
      class="cursor-pointer bg-primary text-accent"
      flat
      style="width: 400px; max-width: 95%"
      clickable
      v-ripple
      @click="onClick()"
   >
      <q-card-section class="column" style="padding-top: 0px">
         <span class="q-ml-xs text-h6 text-weight-medium ellipsis" style="max-width: 95%">
            {{ item.itemTitle }}
         </span>
         <span class="q-ml-xs text-caption text-italic ellipsis" style="max-width: 95%">
            {{ item.itemSubtitle }}
         </span>
      </q-card-section>
   </q-card>
</template>

<script>
export default {
   name: 'SearchResult',
   props: {
      item: {
         type: Object,
         required: true,
      },
   },
   methods: {
      onClick() {
         this.$router.push(this.item.route)
      },
   },
}
</script>

<style></style>
