import firebase from 'firebase'
import '@firebase/firestore'
import ReduxSagaFirebase from 'redux-saga-firebase'

const firebaseApp =
  firebase.apps.length > 0
    ? firebase.app()
    : firebase.initializeApp({
        projectId: 'fir-crud-c9bb4',
        apiKey: 'AIzaSyC-fjB3sXdq-fqptYLxFGjHxUfVdeC7cbc',
        authDomain: 'firebase-crud.firebaseapp.com',
        databaseURL: 'https://fir-crud-c9bb4.firebaseio.com',
        storageBucket: 'firebase-crud.appspot.com',
        messagingSenderId: '983854272279',
      })

const rsf = new ReduxSagaFirebase(firebaseApp)

export default rsf
