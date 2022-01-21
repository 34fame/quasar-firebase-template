import {
   mountFactory,
   qLayoutInjections,
} from '@quasar/quasar-app-extension-testing-unit-jest'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import {
   QMenu,
   QList,
   QItemLabel,
   QItem,
   QItemSection,
   QIcon,
   QBtn,
   ClosePopup,
} from 'quasar'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

import ModulesMenu from '../ModulesMenu.vue'

const $t = jest.fn()
// $t.mockReturnValue('')

const factory = mountFactory(ModulesMenu, {
   mount: {
      provide: qLayoutInjections(),
      localVue,
      router: new VueRouter(),
      store: new Vuex.Store({}),
      mocks: { $t },
   },
   quasar: {
      components: {
         QMenu,
         QList,
         QItemLabel,
         QItem,
         QItemSection,
         QIcon,
         QBtn,
      },
      directives: {
         ClosePopup,
      },
   },
})

describe('ModulesMenu', () => {
   test('mounts', () => {
      const wrapper = factory()
      expect(wrapper).toBeTruthy()
   })
})
