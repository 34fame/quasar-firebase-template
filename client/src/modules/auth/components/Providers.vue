<template>
   <div>
      <q-card-section>
         <span
            class="text-body2 text-weight-light"
            style="width: 320px; max-width: 85%"
            >{{ $t('firsttimelogin') }}</span
         >
      </q-card-section>
      <q-card-section>
         <div class="column items-center q-gutter-md full-width">
            <button-auth-provider provider="amazon" @click="onGoogle" />
            <button-auth-provider provider="apple" @click="onGoogle" />
            <button-auth-provider provider="facebook" @click="onGoogle" />
            <button-auth-provider provider="github" @click="onGoogle" />
            <button-auth-provider provider="google" @click="onGoogle" />
         </div>
      </q-card-section>

      <q-card-section>
         <div class="row justify-start">
            <q-btn
               color="primary"
               :label="$t('back')"
               icon="keyboard_arrow_left"
               no-caps
               outline
               :to="{ name: 'identify' }"
            />
         </div>
      </q-card-section>
   </div>
</template>

<script>
export default {
   name: 'AuthProviders',

   methods: {
      onGoogle() {
         this.$fireauth.signInWithRedirect(this.$fireproviders.google)
      },
   },

   components: {
      ButtonAuthProvider: () => import('components/buttons/ButtonAuthProvider.vue'),
   },
}
</script>

<style></style>
