import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

export default async function SignInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<void> {
  await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((userCredentials) => {
      console.log("Signed in successfully as user:", userCredentials.user.uid);
    })
    .catch((error) => {
      console.error(error.code);
      throw error;
    });
}
