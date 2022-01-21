<template>
   <q-card class="q-mt-lg" flat>
      <q-card-section>
         <div class="row justify-center">
            <q-img src="~assets/undraw_subscriptions.png" width="220px" />
         </div>
      </q-card-section>
      <q-card-section>
         <div class="row justify-center q-gutter-md wrap">
            <!-- Basic Plan -->
            <q-card
               class="q-pa-lg shadow-3"
               :class="$q.screen.lt.md ? 'q-mb-sm' : ''"
               :style="
                  $q.screen.gt.sm
                     ? 'width: 30%;'
                     : $q.screen.gt.xs
                     ? 'width: 60%;'
                     : 'width: 100%;'
               "
            >
               <q-card-section>
                  <div class="row justify-center text-h6">Basic</div>
                  <div class="row justify-center text-subtitle2 text-weight-light">
                     Individual
                  </div>
               </q-card-section>
               <q-card-section>
                  <div class="row justify-center items-end text-h5">
                     $1<span class="text-subtitle2 text-weight-light">/month</span>
                  </div>
               </q-card-section>
               <q-card-section>
                  <div class="row text-caption">
                     Some quick example text to build on the card title and make up the
                     bulk of the card's content.
                  </div>
                  <div class="q-mt-sm">
                     <q-list separator padding>
                        <q-item>
                           <q-item-section avatar>
                              <q-icon color="positive" name="done" />
                           </q-item-section>
                           <q-item-section>Cras justo odio</q-item-section>
                        </q-item>
                        <q-item>
                           <q-item-section avatar>
                              <q-icon color="positive" name="done" />
                           </q-item-section>
                           <q-item-section>Dapibus ac facilisis in</q-item-section>
                        </q-item>
                        <q-item>
                           <q-item-section avatar>
                              <q-icon color="positive" name="done" />
                           </q-item-section>
                           <q-item-section>Vestibulum at eros</q-item-section>
                        </q-item>
                     </q-list>
                     <div class="row justify-center">
                        <q-btn
                           color="secondary"
                           label="Current"
                           disabled
                           no-caps
                           outline
                           rounded
                        />
                     </div>
                  </div>
               </q-card-section>
            </q-card>

            <!-- Standard Plan -->
            <q-card
               class="q-pa-lg shadow-7"
               :class="$q.screen.lt.md ? 'q-mb-sm' : ''"
               :style="
                  $q.screen.gt.sm
                     ? 'width: 30%;'
                     : $q.screen.gt.xs
                     ? 'width: 60%;'
                     : 'width: 100%;'
               "
            >
               <q-card-section>
                  <div class="row justify-center text-h6">Standard</div>
                  <div class="row justify-center text-subtitle2 text-weight-light">
                     Small Business
                  </div>
               </q-card-section>
               <q-card-section>
                  <div class="row justify-center items-end text-h5">
                     $5<span class="text-subtitle2 text-weight-light">/month</span>
                  </div>
               </q-card-section>
               <q-card-section>
                  <div class="row text-caption">
                     Some quick example text to build on the card title and make up the
                     bulk of the card's content.
                  </div>
                  <div class="q-mt-sm">
                     <q-list separator padding>
                        <q-item>
                           <q-item-section avatar>
                              <q-icon color="positive" name="done" />
                           </q-item-section>
                           <q-item-section>Cras justo odio</q-item-section>
                        </q-item>
                        <q-item>
                           <q-item-section avatar>
                              <q-icon color="positive" name="done" />
                           </q-item-section>
                           <q-item-section>Dapibus ac facilisis in</q-item-section>
                        </q-item>
                        <q-item>
                           <q-item-section avatar>
                              <q-icon color="positive" name="done" />
                           </q-item-section>
                           <q-item-section>Vestibulum at eros</q-item-section>
                        </q-item>
                     </q-list>
                     <div class="row justify-center">
                        <q-btn color="secondary" label="Select" no-caps rounded />
                     </div>
                  </div>
               </q-card-section>
            </q-card>

            <!-- Premium Plan -->
            <q-card
               class="q-pa-lg shadow-3"
               :class="$q.screen.lt.md ? 'q-mb-sm' : ''"
               :style="
                  $q.screen.gt.sm
                     ? 'width: 30%;'
                     : $q.screen.gt.xs
                     ? 'width: 60%;'
                     : 'width: 100%;'
               "
            >
               <q-card-section>
                  <div class="row justify-center text-h6">Premium</div>
                  <div class="row justify-center text-subtitle2 text-weight-light">
                     Large Companies
                  </div>
               </q-card-section>
               <q-card-section>
                  <div class="row justify-center items-end text-h5">
                     $1<span class="text-subtitle2 text-weight-light">/user</span>
                  </div>
               </q-card-section>
               <q-card-section>
                  <div class="row text-caption">
                     Some quick example text to build on the card title and make up the
                     bulk of the card's content.
                  </div>
                  <div class="q-mt-sm">
                     <q-list separator padding>
                        <q-item>
                           <q-item-section avatar>
                              <q-icon color="positive" name="done" />
                           </q-item-section>
                           <q-item-section>Cras justo odio</q-item-section>
                        </q-item>
                        <q-item>
                           <q-item-section avatar>
                              <q-icon color="positive" name="done" />
                           </q-item-section>
                           <q-item-section>Dapibus ac facilisis in</q-item-section>
                        </q-item>
                        <q-item>
                           <q-item-section avatar>
                              <q-icon color="positive" name="done" />
                           </q-item-section>
                           <q-item-section>Vestibulum at eros</q-item-section>
                        </q-item>
                     </q-list>
                     <div class="row justify-center">
                        <q-btn color="secondary" label="Select" no-caps outline rounded />
                     </div>
                  </div>
               </q-card-section>
            </q-card>
         </div>
      </q-card-section>
   </q-card>
</template>

<script>
export default {}
</script>

<style></style>
