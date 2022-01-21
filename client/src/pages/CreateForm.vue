<template> 
   <transition
      appear
      enter-active-class="animated slideInRight faster"
      leave-active-class="animated slideOutRight faster"
   >
      <q-page class="q-pa-lg text-primary">
         <q-form class="q-gutter-md" @submit="onSubmit">
            <div v-for="field in fields" :key="field.name">
               <field-input
                  v-if="['text', 'textarea', 'number'].includes(field.type)"
                  :value="model[field.name]"
                  :label="field.name"
                  :readonly="field.readonly"
                  @update="(value) => onUpdate(field.name, value)"
               />
               <field-date
                  v-if="field.type === 'date'"
                  :value="model[field.name]"
                  :label="field.name"
                  :readonly="field.readonly"
                  @update="(value) => onUpdate(field.name, value)"
               />
               <field-radio
                  v-if="field.type === 'radio'"
                  :model="model[field.name]"
                  :options="field.options"
                  :readonly="field.readonly"
                  @update="(value) => onUpdate(field.name, value)"
               />
            </div>

            <div class="q-mt-xl">
               <div class="row justify-start q-gutter-md">
                  <button-regular
                     label="save"
                     :loading="loading"
                     color="secondary"
                     icon="save"
                     size="sm"
                     type="submit"
                  />

                  <button-regular
                     class="shadow-1"
                     label="cancel"
                     @click="onCancel"
                     icon="close"
                     size="sm"
                     outline
                  />
               </div>
            </div>
         </q-form>
      </q-page>
   </transition>
</template>

<script>
export default {
   name: 'CreateForm',

   data() {
      return {
         loading: false,
         fields: [],
         model: {},
      }
   },

   computed: {
      module() {
         let module
         this.$router.currentRoute.matched.some((route) => {
            if (route.meta.module) module = route.meta.module
         })
         return module ? module : this.$route.name.split('-')[0]
      },
   },

   methods: {
      async init() {
         this.loading = true
         let fieldConfig = this.$appConfig.moduleFields(this.module)
         let fields = []
         let model = {}
         Object.keys(fieldConfig).map((field) => {
            fields.push({
               name: field,
               label: field,
               options: fieldConfig[field].options,
               type: fieldConfig[field].type,
               readonly: fieldConfig[field].readonly,
            })
            model[field] = fieldConfig[field].default
         })
         this.fields = fields
         this.model = model
         this.loading = false
      },

      async onCancel() {
         await this.init()
         this.$router.go(-1)
      },

      onUpdate(field, value) {
         this.model[field] = value
      },

      async onSubmit() {
         try {
            await this.$axios.post(`/${this.module}`, this.model)
            await this.init()
            this.$router.push({ name: `${this.module}-list` })
         } catch (error) {
            console.error('CreateForm', 'onSubmit', error)
         }
      },
   },

   components: {
      ButtonRegular: () => import('components/buttons/ButtonRegular.vue'),
      FieldDate: () => import('components/fields/FieldDate.vue'),
      FieldInput: () => import('components/fields/FieldInput.vue'),
      FieldRadio: () => import('components/fields/FieldRadio.vue'),
      FieldSelect: () => import('components/fields/FieldSelect.vue'),
   },

   async created() {
      console.log('createForm created')
      await this.init()
   },
}
</script>

<style lang="sass" scoped></style>
