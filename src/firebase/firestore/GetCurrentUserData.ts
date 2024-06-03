import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { AppUser } from "../../types/AppUser";

export default async function GetCurrentUserData(): Promise<AppUser> {
  try {
    // Get current user information from auth system
    const { currentUser } = FIREBASE_AUTH;

    // Get current user information from firestore system
    const docRef = await getDoc(
      doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, currentUser!.uid),
    );

    return <AppUser>{
      uid: currentUser?.uid,
      first_name: docRef.data()?.first_name,
      surname: docRef.data()?.surname,
      email: currentUser?.email,
      role: docRef.data()?.role,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}
