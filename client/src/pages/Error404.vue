<template>
   <div class="fullscreen bg-white text-secondary text-center q-pa-md flex flex-center">
      <div>
         <q-img src="~assets/undraw_404.png" />

         <div class="q-mt-md text-h2">Oops. Nothing here...</div>

         <q-btn
            class="q-mt-xl"
            color="white"
            text-color="blue"
            unelevated
            @click="onClick"
            :label="$t('goback')"
            no-caps
         />
      </div>
   </div>
</template>

<script>
export default {
   name: 'Error404',

   methods: {
      onClick() {
         this.$router.go(-1)
      },
   },
}
</script>
