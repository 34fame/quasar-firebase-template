<template>
   <q-page class="q-pa-xl bg-white text-primary">
      <div class="column justify-center items-center q-gutter-y-xl">
         <div class="column items-center full-width" style="height: 500px">
            <q-img src="~assets/undraw_fans.svg" style="height: 100%" :ratio="4 / 3" />
         </div>

         <div class="row text-h2 text-weight-bolder">Your app. Your way.</div>

         <q-img src="https://via.placeholder.com/468x320?text=Screenshot+Goes+Here" />

         <div class="column items-center q-gutter-y-sm">
            <div class="text-h3 text-weight-bolder">Lorem ipsum dolor sit amet</div>
            <div class="text-h4 text-weight-bolder text-grey-5">
               Donec porta purus non ex pulvinar
            </div>
         </div>

         <div class="row justify-between wrap q-gutter-y-lg">
            <q-card
               bordered
               v-for="card in featureCards"
               :key="card.title"
               class="q-pa-sm column items-center"
               flat
               :style="$q.screen.lt.md ? 'width: 100%' : 'width: 30%;'"
            >
               <q-img :src="card.image" height="140px" />
               <q-card-section>
                  <div class="column items-center q-gutter-y-sm">
                     <span class="text-h5">{{ card.title }}</span>
                     <span class="text-body2">{{ card.subtitle }}</span>
                  </div>
               </q-card-section>
            </q-card>
         </div>

         <q-separator />

         <div class="column items-center q-gutter-y-sm">
            <div class="text-h3 text-weight-bolder">Lorem ipsum dolor sit amet</div>
            <div class="text-h4 text-weight-bolder text-grey-5">
               Donec porta purus non ex pulvinar
            </div>
         </div>

         <div class="row justify-between wrap q-gutter-y-lg">
            <q-card
               v-for="card in customerQuotes"
               :key="card.quote"
               class="q-pa-sm column items-center bg-primary text-accent"
               flat
               rounded
               :style="$q.screen.lt.md ? 'width: 100%' : 'width: 30%;'"
            >
               <q-card-section class="q-pa-xs">
                  <div class="column justify-between">
                     <div class="column text-body1 text-white" style="min-height: 160px">
                        {{ `"${card.quote}"` }}
                     </div>

                     <div class="column">
                        <span class="text-body1">{{ card.name }}</span>
                        <span class="text-body2 text-grey-5">{{ card.title }}</span>
                     </div>
                  </div>
               </q-card-section>
            </q-card>
         </div>

         <div class="row justify-between items-start wrap" style="width: 100%">
            <div class="column items-start">
               <q-card flat class="text-body2">
                  <q-card-section>
                     <div class="row justify-start items-center q-gutter-x-sm">
                        <q-icon name="apps" size="sm" />
                        <span class="text-h6 text-weight-bold">{{ $t('appname') }}</span>
                     </div>
                  </q-card-section>
                  <q-card-section>
                     <span class="text-grey-6">Your App. Your Way.</span>
                  </q-card-section>
                  <q-card-section>
                     <span class="text-grey-6">© 2021 34 Fame, LLC</span>
                  </q-card-section>
               </q-card>
            </div>
            <div class="column items-start">
               <q-card flat class="text-body2">
                  <q-card-section>
                     <div class="row justify-start items-center q-gutter-x-sm">
                        <span class="text-body1 text-weight-medium">{{
                           $t('links')
                        }}</span>
                     </div>
                     <q-list padding dense>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('products') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('learnmore') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('pricing') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('login') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('signup') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                     </q-list>
                  </q-card-section>
               </q-card>
            </div>
            <div class="column items-start">
               <q-card flat class="text-body2">
                  <q-card-section>
                     <div class="row justify-start items-center q-gutter-x-sm">
                        <span class="text-body1 text-weight-medium">{{
                           $t('products')
                        }}</span>
                     </div>
                     <q-list padding dense>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('overview') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('pricing') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('guides') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('help') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                     </q-list>
                  </q-card-section>
               </q-card>
            </div>
            <div class="column items-start">
               <q-card flat class="text-body2">
                  <q-card-section>
                     <div class="row justify-start items-center q-gutter-x-sm">
                        <span class="text-body1 text-weight-medium">{{
                           $t('company')
                        }}</span>
                     </div>
                     <q-list padding dense>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('about') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('community') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                        <q-item clickable>
                           <q-item-section>
                              <q-item-label>{{ $t('contactus') }}</q-item-label>
                           </q-item-section>
                        </q-item>
                     </q-list>
                  </q-card-section>
               </q-card>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
export default {
   name: 'PublicIndex',

   data() {
      return {
         featureCards: [
            {
               image: require('assets/undraw_secure.svg'),
               title: 'Secure',
               subtitle:
                  'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
            },
            {
               image: require('assets/undraw_collaboration.svg'),
               title: 'Collaborate',
               subtitle:
                  'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
            },
            {
               image: require('assets/undraw_analysis.svg'),
               title: 'Analyze',
               subtitle:
                  'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
            },
            {
               image: require('assets/undraw_photo_album.svg'),
               title: 'Share',
               subtitle:
                  'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
            },
            {
               image: require('assets/undraw_messaging.svg'),
               title: 'Communicate',
               subtitle:
                  'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
            },
            {
               image: require('assets/undraw_location.svg'),
               title: 'Locate',
               subtitle:
                  'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
            },
         ],

         customerQuotes: [
            {
               quote:
                  'Vestibulum et orci sem. Cras dignissim, quam et varius vestibulum, diam metus auctor enim',
               name: 'Bill O.',
               title: 'Sales Executive',
            },
            {
               quote:
                  'Nullam pellentesque ante a eros pulvinar, eu dignissim erat cursus.',
               name: 'Gretta K.',
               title: 'Sales Operations',
            },
            {
               quote:
                  'Maecenas sit amet semper felis. Etiam non semper enim. Maecenas tristique diam vel sapien condimentum ultrices vestibulum ac sapien.',
               name: 'Mary E.',
               title: 'Chief Revenue Officer',
            },
         ],
      }
   },
}
</script>

<style lang="sass" scoped></style>
