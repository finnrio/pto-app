import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";

function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

export default async function AddUser(userData: any, password: string) {
  const originalUser = FIREBASE_AUTH.currentUser;
  await createUserWithEmailAndPassword(FIREBASE_AUTH, userData.email, password)
    .then(async (userCredential) => {
      const { uid } = userCredential.user;
      const { NODE_ENV } = process.env;
      await FIREBASE_AUTH.updateCurrentUser(originalUser); // this is required as the createUser function from firebase logs in that user on creation
      await setDoc(doc(FIRESTORE_DB, `${NODE_ENV}`, uid), {
        ...userData,
        pto_allowance: process.env.defaultPTOAllowance,
        pto_used: 0,
        pto_pending: 0,
        user_color: generateRandomColor(),
      }).catch((error) => {
        console.error(error);
        throw error;
      });
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
