import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

  apiKey: "AIzaSyBZzrSHlHjXeq1baEdz2lnjP_VfKVQJPMI",

  authDomain: "bansurisangeet.firebaseapp.com",

  projectId: "bansurisangeet",

  storageBucket: "bansurisangeet.appspot.com",

  messagingSenderId: "425345472774",

  appId: "1:425345472774:web:b7e8e7e4f28d2f8a252687"

};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);