import { createUserWithEmailAndPassword } from "firebase/auth";

import { FIREBASE_AUTH } from "../firebaseConfig";
import { AppUser } from "../../types/AppUser";

export default async function AddUser(userData: AppUser, password: string) {
  await createUserWithEmailAndPassword(FIREBASE_AUTH, userData.email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      console.log("User added to system: ", user);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
