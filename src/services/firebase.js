import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyByoI5cFEVU-hBljpRcYoT-yyRh4SxcPEg',
    authDomain: 'chat-app-vue-aceba.firebaseapp.com',
    projectId: 'chat-app-vue-aceba',
    storageBucket: 'chat-app-vue-aceba.appspot.com',
    messagingSenderId: '303529173939',
    appId: '1:303529173939:web:a083b5da485470627761c6',
};

// Initialize
firebase.initializeApp(firebaseConfig);

export default firebase;