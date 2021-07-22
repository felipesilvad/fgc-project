import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCTLBvAFBa8o91KId7dabbTzmzmfAXSmOk",
    authDomain: "fgc-project-49fee.firebaseapp.com",
    projectId: "fgc-project-49fee",
    storageBucket: "fgc-project-49fee.appspot.com",
    messagingSenderId: "678198232891",
    appId: "1:678198232891:web:73b14070c6c32b4ef4d91e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};