import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA_EcGEFtsXQhy6UV5gIzm3YTTWvx8Ywe0",
  authDomain: "crud-img2022.firebaseapp.com",
  projectId: "crud-img2022",
  storageBucket: "crud-img2022.appspot.com",
  messagingSenderId: "174370657020",
  appId: "1:174370657020:web:1e09a9dc80de75bdb6bd79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);