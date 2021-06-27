import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBXqtL0oNmlbNjH60p8lUhIkDJSGARX1W8",
    authDomain: "clone-ba5ae.firebaseapp.com",
    projectId: "clone-ba5ae",
    storageBucket: "clone-ba5ae.appspot.com",
    messagingSenderId: "1023134089906",
    appId: "1:1023134089906:web:206b159772f4bd064d7fab"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth= firebase.auth();

  export{ db, auth};