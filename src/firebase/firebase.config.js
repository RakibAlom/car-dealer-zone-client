// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqzlAPfhmHegcbVfQrsd-KXIMLEGdRMCc",
  authDomain: "car-dealer-zone.firebaseapp.com",
  projectId: "car-dealer-zone",
  storageBucket: "car-dealer-zone.appspot.com",
  messagingSenderId: "118397608245",
  appId: "1:118397608245:web:6e2c00d9822b25f1a06c7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;