import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function VerifyUser(uid: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(
      doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, uid),
    );
    if (userDoc.exists()) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
