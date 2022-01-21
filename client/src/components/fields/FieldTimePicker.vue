<template>
   <div class="column q-gutter-y-md">
      <span class="text-caption">{{ label }}</span>
      <div class="q-mt-xs row justify-between" style="width: 132px">
         <div class="row justify-center" style="width: 44px">
            <q-btn
               round
               color="grey-5"
               icon="keyboard_arrow_up"
               size="sm"
               @click="upHour()"
            />
         </div>
         <div class="row justify-center" style="width: 44px">
            <q-btn
               round
               color="grey-5"
               icon="keyboard_arrow_up"
               size="sm"
               @click="upMinute()"
            />
         </div>
         <div class="row justify-center" style="width: 44px">
            <q-btn
               round
               color="grey-5"
               icon="keyboard_arrow_up"
               size="sm"
               @click="toggleAMPM()"
            />
         </div>
      </div>
      <div class="row justify-between items-center">
         <span class="text-h6 text-grey-9 row justify-center" style="width: 44px">{{
            model.hours
         }}</span>
         <span class="text-h6 text-grey-9 row justify-center" style="width: 44px">{{
            model.minutes
         }}</span>
         <span
            class="text-subtitle1 text-grey-7 text-uppercase row justify-center"
            style="width: 44px"
            >{{ model.ampm }}</span
         >
      </div>
      <div class="row justify-between">
         <div class="row justify-center" style="width: 44px">
            <q-btn
               round
               color="grey-5"
               icon="keyboard_arrow_down"
               size="sm"
               @click="downHour()"
            />
         </div>
         <div class="row justify-center" style="width: 44px">
            <q-btn
               round
               color="grey-5"
               icon="keyboard_arrow_down"
               size="sm"
               @click="downMinute()"
            />
         </div>
         <div class="row justify-center" style="width: 44px">
            <q-btn
               round
               color="grey-5"
               icon="keyboard_arrow_down"
               size="sm"
               @click="toggleAMPM()"
            />
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'FieldSelect',

   props: {
      datetime: {
         type: String | Number | Object,
         require: true,
      },
      label: {
         type: String,
         required: true,
      },
      readonly: {
         type: Boolean,
         default: false,
      },
   },

   data() {
      return {
         model: {
            hours: 0,
            minutes: 0,
            ampm: 'am',
         },
         updatedDt: this.datetime,
      }
   },

   methods: {
      upHour() {
         if (this.model.hours === 12) {
            this.model.hours = 1
            return
         }
         this.model.hours += 1
      },
      upMinute() {
         if (this.model.minutes === 59) {
            this.model.minutes = 0
            return
         }
         this.model.minutes += 1
      },
      downHour() {
         if (this.model.hours === 1) {
            this.model.hours = 12
            return
         }
         this.model.hours -= 1
      },
      downMinute() {
         if (this.model.minutes === 0) {
            this.model.minutes = 59
            return
         }
         this.model.minutes -= 1
      },
      toggleAMPM() {
         this.model.ampm = this.model.ampm === 'am' ? 'pm' : 'am'
      },
   },

   mounted() {
      let hours = new Date(this.datetime).getHours()
      let minutes = new Date(this.datetime).getMinutes()
      console.log('datetime', this.datetime, hours, minutes)
      if (hours >= 12) {
         this.model.ampm = 'pm'
         if (hours !== 12) hours -= 12
      }
      this.model.hours = hours
      this.model.minutes = minutes
   },

   watch: {
      model: {
         deep: true,
         handler: function (model) {
            console.log(JSON.stringify(model))
            let adjustedHours = model.hours
            if (model.ampm === 'pm' && model.hours < 12) adjustedHours += 12
            if (model.ampm === 'pm' && model.hours === 12) this.model.ampm = 'pm'
            let year = new Date(this.datetime).getFullYear()
            let month = new Date(this.datetime).getMonth()
            let day = new Date(this.datetime).getDate()

            this.updatedDt = new Date(year, month, day, adjustedHours, model.minutes)
         },
      },
      updatedDt: function (value) {
         console.log('updatedDt', value)
         console.log(value.toLocaleString())
      },
   },
}
</script>

<style></style>
