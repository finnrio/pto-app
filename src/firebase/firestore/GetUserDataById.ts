import { doc, getDoc } from "firebase/firestore";
import { AppUser } from "../../types/AppUser";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function GetUserDataById(id: string): Promise<AppUser> {
  try {
    const docRef = await getDoc(
      doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, id),
    );
    return <AppUser>{
      uid: id,
      first_name: docRef.data()?.first_name,
      surname: docRef.data()?.surname,
      email: docRef.data()?.email,
      manager_id: docRef.data()?.manager_id,
      role: docRef.data()?.role,
      pto_allowance: docRef.data()?.pto_allowance,
      pto_used: docRef.data()?.pto_used,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
