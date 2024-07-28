// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword ,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore ,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage , ref , uploadBytes ,getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0CHzblwJKc6YiEn3AeBJSYifJUikvV7Q",
  authDomain: "ace-connection-430618-j2.firebaseapp.com",
  projectId: "ace-connection-430618-j2",
  storageBucket: "ace-connection-430618-j2.appspot.com",
  messagingSenderId: "634228673300",
  appId: "1:634228673300:web:5446e72d91094c3d5f1001",
  measurementId: "G-PLLNPDSCL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);


export {
  auth,
  db,
  storage,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword ,
  doc,
  setDoc,
  ref , 
  uploadBytes ,
  getDownloadURL ,
  signOut,
  getDoc,
  collection,
  addDoc,
  getDocs,
};
