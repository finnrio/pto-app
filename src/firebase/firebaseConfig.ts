import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBEjW_646bH_Q4ECQD_g7nXhM_WTDQQZqw",
  authDomain: "pto-app-30271.firebaseapp.com",
  databaseURL: "https://pto-app-30271.firebaseio.com",
  projectId: "pto-app-30271",
  storageBucket: "pto-app-30271.appspot.com",
  messagingSenderId: "440515616929",
  appId: "1:440515616929:ios:1be65de5cfa7a0048210e0",
  measurementId: "1:440515616929:ios:1be65de5cfa7a0048210e0",
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

if (process.env.NODE_ENV === "test") {
  console.log(
    "Firebase app initialised in test mode, connecting to emulators...",
  );
  // connectAuthEmulator(getAuth(FIREBASE_APP), "http://localhost:9099"); // TODO come back to this
  connectFirestoreEmulator(getFirestore(FIREBASE_APP), "localhost", 8080);
}

// export { FIREBASE_APP, FIRESTORE_DB};
export { FIREBASE_AUTH, FIRESTORE_DB };
