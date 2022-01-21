<template>
   <q-tooltip class="q-pa-none tooltip">
      <div class="tooltip-text bg-grey-10 text-body1 text-weight-bold relative-position">
         <slot />
      </div>
      <div class="tooltip-arrow bg-grey-10 absolute"></div>
   </q-tooltip>
</template>

<script>
export default {
   name: 'Tooltip',
}
</script>

<style lang="sass">
$box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.5)

.tooltip
   overflow: visible
   background: transparent

   &-text
      border-radius: 10px
      padding: 20px
      z-index: 10

   &-arrow
      width: 30px
      height: 30px
      transform: translateX(-50%) rotate(-45deg) skew(-20deg, -20deg)
      z-index: 5
         top: 0
         left: 50%

      &-top &
         top: 0
         left: 50%
</style>
