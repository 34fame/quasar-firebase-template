import Vue from 'vue'
import _cloneDeep from 'lodash/cloneDeep'

import { firestore } from 'boot/firebase'

const state = {
   collection: {},
}

const mutations = {
   setCollection: (state, value) => {
      state.collection = value
   },

   setCollectionItem: (state, value) => {
      Vue.set(state.collection, value.id, value)
   },

   deleteCollectionItem: (state, id) => {
      Vue.delete(state.collection, id)
   },
}

const getters = {
   all: (state) => {
      let response = []
      Object.keys(state.collection).map((key) => {
         response.push(_cloneDeep(state.collection[key]))
      })
      return response
   },

   byId: (state) => (id) => {
      return _cloneDeep(state.collection[id])
   },
}

const actions = {
   bind: async ({ commit }) => {
      try {
         let itemsRef = firestore.collection('users')
         await itemsRef.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
               if (change.type === 'added') {
                  if (
                     !change.doc.metadata.hasPendingWrites ||
                     process.env.ENV === 'local'
                  ) {
                     commit('setCollectionItem', {
                        id: change.doc.id,
                        ...change.doc.data(),
                     })
                  }
               }

               if (change.type === 'modified') {
                  commit('setCollectionItem', {
                     id: change.doc.id,
                     ...change.doc.data(),
                  })
               }

               if (change.type === 'removed') {
                  commit('deleteCollectionItem', change.doc.id)
               }
            })
         })
      } catch (error) {
         console.error('store-users', 'bind', error)
      }
   },
}

export default {
   namespaced: true,
   state,
   mutations,
   getters,
   actions,
}
