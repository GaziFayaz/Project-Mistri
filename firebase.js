// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Xu9O_DnJuivC7AKVzQqGnhrxNJXTUwI",
  authDomain: "projectmistri.firebaseapp.com",
  projectId: "projectmistri",
  storageBucket: "projectmistri.appspot.com",
  messagingSenderId: "636224223268",
  appId: "1:636224223268:web:e3594bbbfb2dd2cb81c0b1",
  measurementId: "G-5WY70C8ZY2",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export { app, db, storage, auth };
