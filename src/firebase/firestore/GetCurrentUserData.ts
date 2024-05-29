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
      email: docRef.data()?.email,
      role: docRef.data()?.role,
      manager_id: docRef.data()?.manager_id,
      pto_allowance: docRef.data()?.pto_allowance,
      pto_used: docRef.data()?.pto_used,
    };
  } catch (e) {
    console.error("Error retrieving current user information: ", e);
    throw e;
  }
}
