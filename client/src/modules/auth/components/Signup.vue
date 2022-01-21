<template>
   <div>
      <q-card-section>
         <span
            class="text-body2 text-weight-light"
            style="width: 320px; max-width: 85%"
            >{{ $t('signup') }}</span
         >
      </q-card-section>
      <q-form @submit.stop="onSignup">
         <q-card-section>
            <field-input :disabled="true" label="username" v-model="model.username" />
         </q-card-section>

         <q-card-section>
            <field-input
               label="name"
               :value="model.name"
               @update="(value) => onUpdate('name', value)"
            />
         </q-card-section>

         <q-card-section>
            <field-input
               label="email"
               :value="model.email"
               @update="(value) => onUpdate('email', value)"
            />
         </q-card-section>

         <q-card-section>
            <field-date
               label="birthdate"
               :value="model.birthdate"
               @update="(value) => onUpdate('birthdate', value)"
            />
         </q-card-section>

         <q-card-section>
            <q-checkbox
               class="text-primary text-caption"
               v-model="acceptTerms"
               :label="$t('acceptterms')"
            />
         </q-card-section>

         <q-card-section>
            <div class="row justify-between">
               <q-btn
                  color="primary"
                  :label="$t('notrightnow')"
                  no-caps
                  outline
                  :to="{ name: 'public' }"
               />
               <q-btn
                  color="primary"
                  :disable="!acceptTerms"
                  :label="$t('signup')"
                  no-caps
                  type="submit"
               />
            </div>
         </q-card-section>
      </q-form>
   </div>
</template>

<script>
export default {
   name: 'Signup',

   data() {
      return {
         loading: false,
         model: {
            username: '',
            name: '',
            email: '',
            birthdate: '',
            agreedToTermsOn: null,
         },
         acceptTerms: false,
      }
   },
   methods: {
      onUpdate(field, value) {
         this.model[field] = value
      },

      async onSignup() {
         try {
            this.loading = true
            await this.$axios.post(`/public/register/${this.model.id}`, this.model)
            return this.$router.push({ name: 'index' })
         } catch (error) {
            console.error('Login', 'onSignup', error.message)
         } finally {
            this.loading = false
         }
      },
   },

   watch: {
      acceptTerms: function (value) {
         if (value) {
            this.model.agreedToTermsOn = new Date().valueOf()
         }
      },
   },

   async mounted() {
      try {
         this.loading = true
         const username = this.$storage.getItem('username')

         const profile = this.$storage.getItem('profile')
         this.model = {
            id: profile.id,
            name: profile.displayName,
            email: profile.email,
            picture: profile.picture
               ? profile.picture
               : `https://www.gravatar.com/avatar/${profile.id}?d=identicon`,
            provider: profile.provider,
            username,
            role: 'member',
         }
      } catch (error) {
         console.log('SignUp', 'mounted', error)
      } finally {
         this.loading = false
      }
   },

   components: {
      FieldInput: () => import('components/fields/FieldInput.vue'),
      FieldSelect: () => import('components/fields/FieldSelect.vue'),
      FieldDate: () => import('components/fields/FieldDate.vue'),
   },
}
</script>

<style></style>
