// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKqk35FkkY-xQvMx5t9OnXclHthwde68g",
  authDomain: "password-base-user.firebaseapp.com",
  projectId: "password-base-user",
  storageBucket: "password-base-user.firebasestorage.app",
  messagingSenderId: "313025642927",
  appId: "1:313025642927:web:93698f7fbe74cf5dff6f5a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
