<template>
   <q-btn
      class="text-capitalize full-width"
      :data-cy="provider"
      :icon="brand.icon"
      :label="brand.label"
      :style="brand.style"
      size="lg"
      @click="$emit('click')"
   />
</template>

<script>
export default {
   name: 'ButtonAuthProvider',

   props: {
      provider: {
         type: String,
         required: true,
      },
   },

   computed: {
      brand() {
         switch (this.provider) {
            case 'amazon':
               return {
                  icon: 'fab fa-amazon',
                  style: 'background-color: #ff9900; color: white;',
                  label: `${this.$t('signinwith')} ${this.provider}`,
               }
            case 'apple':
               return {
                  icon: 'fab fa-apple',
                  style: 'background-color: #3a3a3a; color: #dbdbdb;',
                  label: `${this.$t('signinwith')} ${this.provider}`,
               }
            case 'facebook':
               return {
                  icon: 'fab fa-facebook',
                  style: 'background-color: #3b5998; color: white;',
                  label: `${this.$t('signinwith')} ${this.provider}`,
               }
            case 'github':
               return {
                  icon: 'fab fa-github',
                  style: 'background-color: #333333; color: white;',
                  label: `${this.$t('signinwith')} ${this.provider}`,
               }
            case 'google':
               return {
                  icon: 'fab fa-google',
                  style: 'background-color: #34a853; color: white;',
                  label: `${this.$t('signinwith')} ${this.provider}`,
               }
         }
      },
   },
}
</script>

<style></style>
