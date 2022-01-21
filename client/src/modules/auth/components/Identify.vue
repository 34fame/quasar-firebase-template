<template>
   <q-form @submit.stop="onSubmit">
      <q-card-section>
         <field-select
            :options="localeOptions"
            :value="model.locale"
            label="language"
            @update="(value) => onUpdate('locale', value)"
         />
      </q-card-section>

      <q-card-section>
         <field-input
            label="username"
            :value="model.username"
            @update="(value) => onUpdate('username', value)"
         />
      </q-card-section>

      <q-card-section>
         <div class="row justify-between">
            <q-btn
               color="primary"
               :label="$t('back')"
               icon="keyboard_arrow_left"
               no-caps
               outline
               :to="{ name: 'public' }"
            />
            <q-btn
               color="primary"
               :disable="!model.username.length"
               :label="$t('next')"
               icon-right="keyboard_arrow_right"
               no-caps
               type="submit"
            />
         </div>
      </q-card-section>
   </q-form>
</template>

<script>
export default {
   name: 'Identify',

   data() {
      return {
         loading: false,
         localeOptions: [{ label: 'English', value: 'en-us' }],
         model: {
            username: '',
            locale: 'en-us',
         },
      }
   },

   methods: {
      onUpdate(field, value) {
         this.model[field] = value
      },

      async onSubmit() {
         try {
            const username = this.model.username
            console.log('Identify', 'onSubmit', 'username', username)
            this.$storage.set('username', username)
            const userRequest = await this.$axios.post(`public/search`, { username })

            const user = userRequest.data
            console.log('Identify', 'onSubmit', 'user', user)
            if (!user || !user.provider) {
               return this.$router.push({ name: 'providers' })
            }
            this.$fireauth.signInWithRedirect(this.$fireproviders[user.provider])
         } catch (error) {
            console.error('Identify', 'onSubmit', error)
         }
      },
   },

   watch: {
      'model.locale': function (value) {
         //TODO set locale
      },
   },

   components: {
      FieldSelect: () => import('components/fields/FieldSelect.vue'),
      FieldInput: () => import('components/fields/FieldInput.vue'),
   },
}
</script>

<style></style>
