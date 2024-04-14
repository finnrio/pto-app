import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBEjW_646bH_Q4ECQD_g7nXhM_WTDQQZqw',
  authDomain: 'pto-app-30271.firebaseapp.com',
  databaseURL: 'https://pto-app-30271.firebaseio.com',
  projectId: 'pto-app-30271',
  storageBucket: 'pto-app-30271.appspot.com',
  messagingSenderId: '440515616929',
  appId: '1:440515616929:ios:1be65de5cfa7a0048210e0',
  measurementId: '1:440515616929:ios:1be65de5cfa7a0048210e0',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);