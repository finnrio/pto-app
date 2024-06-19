import { doc, getDoc } from "firebase/firestore";
import { AppUser } from "../../types/AppUser";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function GetUserData(id: string): Promise<AppUser> {
  return getDoc(doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, id)).then(
    (docRef) => {
      if (docRef.exists()) {
        return <AppUser>{
          uid: id,
          first_name: docRef.data().first_name,
          surname: docRef.data().surname,
          email: docRef.data().email,
          role: docRef.data().role,
          manager_id: docRef.data().manager_id,
          pto_allowance: docRef.data().pto_allowance,
          pto_used: docRef.data().pto_used,
          pto_pending: docRef.data().pto_pending,
          user_color: docRef.data().user_color,
        };
      }
      throw new Error(
        `Error retrieving current user information: User not found`,
      );
    },
  );
}
