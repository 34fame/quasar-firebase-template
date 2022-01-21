<template>
   <div class="q-mt-lg row justify-center">
      <q-card class="q-mt-lg" flat>
         <q-card-section>
            <div class="row justify-center">
               <q-img src="~assets/undraw_appearance.png" width="220px" />
            </div>
         </q-card-section>
         <q-card-section>
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
               <field-select
                  v-if="field.type === 'select'"
                  :label="field.name"
                  :model="model[field.name]"
                  :options="field.options"
                  :readonly="field.readonly"
                  :value="model[field.name]"
                  @update="(value) => onUpdate(field.name, value)"
               />
            </div>
         </q-card-section>
      </q-card>
   </div>
</template>

<script>
import { colors } from 'quasar'

export default {
   name: 'Appearance',

   data() {
      return {
         loading: false,
         fields: [],
         model: {},
      }
   },

   computed: {
      module() {
         return this.$route.name
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
      },

      onUpdate(field, value) {
         this.model[field] = value
      },

      async onSubmit() {
         try {
            await firestore.collection(this.module).add(this.model)
            await this.init()
            this.$router.push({ name: `${this.module}-list` })
         } catch (error) {
            console.error('CreateForm', 'onSubmit', error)
         }
      },
   },

   watch: {
      'model.theme': function (theme) {
         Object.keys(theme).map((setting) => {
            colors.setBrand(setting, theme[setting])
         })
      },
   },

   async created() {
      await this.init()
   },

   components: {
      FieldDate: () => import('components/fields/FieldDate.vue'),
      FieldInput: () => import('components/fields/FieldInput.vue'),
      FieldRadio: () => import('components/fields/FieldRadio.vue'),
      FieldSelect: () => import('components/fields/FieldSelect.vue'),
   },
}
</script>

<style></style>
