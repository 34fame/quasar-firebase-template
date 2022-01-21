<template>
   <transition
      appear
      enter-active-class="animated slideInRight faster"
      leave-active-class="animated slideOutLeft faster"
   >
      <q-page class="q-pa-lg text-primary">
         <q-form class="q-gutter-md">
            <div v-for="field in fields" :key="field.name">
               <field-input
                  v-if="['text', 'textarea', 'number'].includes(field.type)"
                  :value="model[field.name]"
                  :label="field.name"
                  :readonly="true"
                  @update="(value) => onUpdate(field.name, value)"
               />
               <field-date
                  v-if="field.type === 'date'"
                  :value="model[field.name]"
                  :label="field.name"
                  :readonly="true"
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
                     label="edit"
                     color="secondary"
                     icon="edit_note"
                     size="sm"
                     :to="{ name: `${module}-update`, params: { id: model.id } }"
                  />

                  <button-regular
                     class="shadow-1"
                     label="close"
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
import { mapGetters } from 'vuex'

export default {
   name: 'ViewForm',

   data() {
      return {
         loading: false,
         fields: [],
         model: {},
      }
   },

   computed: {
      ...mapGetters(['users/byId', 'roles/byId']),

      module() {
         return this.$route.name.split('-')[0]
      },
   },

   methods: {
      init() {
         let fieldConfig = this.$appConfig.moduleFields(this.module)
         let fields = []
         Object.keys(fieldConfig).map((field) => {
            fields.push({
               name: field,
               label: field,
               options: fieldConfig[field].options,
               type: fieldConfig[field].type,
               readonly: true,
            })
         })
         this.fields = fields
         this.model = this[`${this.module}/byId`](this.$route.params.id)
      },

      onCancel() {
         this.$router.go(-1)
      },
   },

   components: {
      ButtonRegular: () => import('components/buttons/ButtonRegular.vue'),
      FieldDate: () => import('components/fields/FieldDate.vue'),
      FieldInput: () => import('components/fields/FieldInput.vue'),
      FieldRadio: () => import('components/fields/FieldRadio.vue'),
      FieldSelect: () => import('components/fields/FieldSelect.vue'),
   },

   created() {
      this.init()
   },

   beforeDestroy() {
      this.model = {}
   },
}
</script>

<style lang="sass" scoped></style>
