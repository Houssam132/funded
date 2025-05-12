import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC-vKa2rJkmdc8R8w4NpIKRYr6KKaoPrFk",
  authDomain: "sharetemp-ad298.firebaseapp.com",
  projectId: "sharetemp-ad298",
  storageBucket: "sharetemp-ad298.appspot.com",
  messagingSenderId: "1069248707246",
  appId: "1:1069248707246:web:e8234d9b7508ff4a4fcb3f",
  measurementId: "G-2FM7YBVRER"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };