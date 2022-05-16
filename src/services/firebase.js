// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByoI5cFEVU-hBljpRcYoT-yyRh4SxcPEg",
  authDomain: "chat-app-vue-aceba.firebaseapp.com",
  projectId: "chat-app-vue-aceba",
  storageBucket: "chat-app-vue-aceba.appspot.com",
  messagingSenderId: "303529173939",
  appId: "1:303529173939:web:a083b5da485470627761c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;