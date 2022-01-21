import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'
import 'firebase/firestore'
import 'firebase/auth'

const FIREBASE_CONFIG = {
   apiKey: process.env.FIREBASE_APIKEY,
   authDomain: process.env.FIREBASE_AUTHDOMAIN,
   databaseURL: process.env.FIREBASE_DATABASEURL,
   projectId: process.env.FIREBASE_PROJECTID,
   storageBucket: process.env.FIREBASE_STORAGEBUCKET,
   messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
   appId: process.env.FIREBASE_APPID,
   measurementId: process.env.FIREBASE_MEASUREMENTID,
}

firebase.initializeApp(FIREBASE_CONFIG)
const firestorage = firebase.storage()
const firestore = firebase.firestore()
const fireauth = firebase.auth()
const fireanalytics = firebase.analytics()
firebase.performance()
if (process.env.ENV === 'local') {
   console.log('Using Emulators...')
   firestore.settings({ experimentalForceLongPolling: true })
   firestore.useEmulator('localhost', 8070)
   fireauth.useEmulator('http://localhost:9099')
}
const { serverTimestamp, increment, arrayRemove, arrayUnion } = firebase.firestore.FieldValue

Vue.prototype.$fireanalytics = fireanalytics
Vue.prototype.$fireauth = fireauth
Vue.prototype.$firestore = firestore
Vue.prototype.$firestorage = firestorage
Vue.prototype.$timestamp = serverTimestamp
Vue.prototype.$increment = increment
Vue.prototype.$arrayRemove = arrayRemove
Vue.prototype.$arrayUnion = arrayUnion
Vue.prototype.$fireproviders = {
   apple: new firebase.auth.OAuthProvider('apple.com'),
   facebook: new firebase.auth.FacebookAuthProvider(),
   github: new firebase.auth.GithubAuthProvider(),
   google: new firebase.auth.GoogleAuthProvider(),
   microsoft: new firebase.auth.OAuthProvider('microsoft.com'),
   twitter: new firebase.auth.TwitterAuthProvider(),
   yahoo: new firebase.auth.OAuthProvider('yahoo.com'),
}

export { fireauth, firestore, firestorage }
