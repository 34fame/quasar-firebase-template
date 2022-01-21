<template>
   <q-page class="flex flex-center">
      <div class="column">
         <template v-if="loading">
            <q-inner-loading :spinning="loading" />
         </template>
         <template v-else>
            <!-- Login Card -->
            <transition appear enter-active-class="animated backInLeft">
               <q-card class="q-mt-lg q-pa-md" flat style="width: 400px; max-width: 95%">
                  <!-- Brand -->
                  <q-card-section>
                     <div class="row justify-center items-end q-gutter-md">
                        <q-icon color="primary" name="vpn_key" size="xl" />
                        <span class="text-h4 text-weight-light">Secure Login</span>
                     </div>
                  </q-card-section>

                  <template v-if="view === 'username'">
                     <q-form @submit.stop="onSubmitUsername">
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
                                 :loading="loading"
                                 icon-right="keyboard_arrow_right"
                                 no-caps
                                 type="submit"
                              />
                           </div>
                        </q-card-section>
                     </q-form>
                  </template>

                  <template v-if="view === 'signup'">
                     <q-form @submit.stop="onSubmitSignup">
                        <q-card-section>
                           <field-input
                              :disabled="true"
                              label="username"
                              v-model="model.username"
                           />
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
                                 @click="view = 'username'"
                              />
                              <q-btn
                                 color="primary"
                                 :disable="!acceptTerms"
                                 :label="$t('signup')"
                                 :loading="loading"
                                 no-caps
                                 type="submit"
                              />
                           </div>
                        </q-card-section>
                     </q-form>

                     <!-- Terms & Privacy -->
                     <q-card-section>
                        <div
                           class="q-mt-md q-px-md row justify-between items-center text-grey-5 text-caption"
                        >
                           <q-btn flat :label="$t('termsofuse')" no-caps />
                           <q-btn flat :label="$t('help')" no-caps />
                           <q-btn flat :label="$t('privacy')" no-caps />
                        </div>
                     </q-card-section>
                  </template>

                  <template v-if="view === 'providers'">
                     <q-card-section>
                        <span
                           class="text-body2 text-weight-light"
                           style="width: 320px; max-width: 85%"
                           >{{ $t('firsttimelogin') }}</span
                        >
                     </q-card-section>
                     <q-card-section>
                        <div class="column items-center q-gutter-md full-width">
                           <button-auth-provider
                              provider="amazon"
                              @click="onClickProvider('amazon')"
                           />
                           <button-auth-provider
                              provider="apple"
                              @click="onClickProvider('apple')"
                           />
                           <button-auth-provider
                              provider="facebook"
                              @click="onClickProvider('facebook')"
                           />
                           <button-auth-provider
                              provider="github"
                              @click="onClickProvider('github')"
                           />
                           <button-auth-provider
                              provider="google"
                              @click="onClickProvider('google')"
                           />
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
                              @click="view = 'username'"
                           />
                        </div>
                     </q-card-section>
                  </template>
               </q-card>
            </transition>
         </template>
      </div>
   </q-page>
</template>

<script>
import { Platform } from 'quasar'
import { uid } from 'uid'
import jwt_decode from 'jwt-decode'

export default {
   name: 'Login',

   data() {
      return {
         view: 'username',
         loading: true,
         localeOptions: [{ label: 'English', value: 'en-us' }],
         model: {
            locale: 'en-us',
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

      async onSubmitUsername() {
         try {
            this.loading = true
            const username = this.model.username
            const userRequest = await this.$axios.post(`public/search`, { username })
            this.$log.debug('userRequest', userRequest)
            if (userRequest.data === false) {
               this.view = 'signup'
            } else {
               this.model = userRequest.data
               this.view = 'providers'
            }
         } catch (error) {
            this.$log.error(error)
         } finally {
            this.loading = false
         }
      },

      async onSubmitSignup() {
         try {
            this.loading = true
            const userId = uid()
            await this.$axios.post(`/public/register/${userId}`, this.model)
            this.$log.debug(this.model)
            this.view = 'providers'
         } catch (error) {
            this.$log.error(error)
         } finally {
            this.loading = false
         }
      },

      async onClickProvider(provider) {
         this.$fireanalytics.logEvent('login', { provider })
         if (Platform.is.cordova) {
            this.$fireauth.signInWithRedirect(this.$fireproviders[provider])
         } else {
            this.$fireauth.signInWithRedirect(this.$fireproviders[provider])
         }
      },
   },

   async mounted() {
      if (Platform.is.cordova) return false
      try {
         this.loading = true
         const redirectResult = await this.$fireauth.getRedirectResult()
         this.$log.debug('redirectResult', redirectResult)

         if (redirectResult.user) {
            const { displayName, email, photoURL } = redirectResult.user
            const { idToken } = redirectResult.credential

            const authProfile = {
               name: displayName,
               email,
               photoUrl: photoURL,
            }

            this.$log.debug('authProfile', authProfile)
            this.$log.debug('idToken', idToken)

            this.$log.debug('model', this.model)
            this.$storage.set('isAuthenticated', true)
            this.$storage.set('token', idToken)
            this.$storage.set('profile', {
               ...authProfile,
               ...this.model,
            })
            this.$router.push({ name: 'home' })
         }
      } catch (error) {
         this.$log.error(error)
      } finally {
         this.loading = false
      }
   },

   watch: {
      'model.locale': function (value) {
         //TODO set locale
      },
      acceptTerms: function (value) {
         if (value) {
            this.model.agreedToTermsOn = new Date().valueOf()
         }
      },
   },

   components: {
      ButtonAuthProvider: () => import('components/buttons/ButtonAuthProvider.vue'),
      FieldInput: () => import('components/fields/FieldInput.vue'),
      FieldSelect: () => import('components/fields/FieldSelect.vue'),
      FieldDate: () => import('components/fields/FieldDate.vue'),
   },
}
</script>

<style></style>
