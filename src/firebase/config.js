import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA6wB3K2Lr6xuTmsuoFWw-kNq-9IAAkurA",
    authDomain: "bauet-scope.firebaseapp.com",
    projectId: "bauet-scope",
    storageBucket: "bauet-scope.appspot.com",
    messagingSenderId: "473403026369",
    appId: "1:473403026369:web:91e013dce76248864f1d40"
  };

  //firebase inititailization
  firebase.initializeApp(firebaseConfig);

  //service initialization
  const  BAUET_SCOPE_AUTHENTICATION = firebase.auth()
  const BAUET_SCOPE_FIRESTORE = firebase.firestore()
  const BAUET_SCOPE_STORAGE = firebase.storage()

  //Timestamp
  const timestamp = firebase.firestore.Timestamp

  export {BAUET_SCOPE_AUTHENTICATION,BAUET_SCOPE_FIRESTORE,BAUET_SCOPE_STORAGE,timestamp}

















