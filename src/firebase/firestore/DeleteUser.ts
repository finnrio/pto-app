import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function DeleteUser(uid: string) {
  try {
    await deleteDoc(doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, uid));
  } catch (e) {
    console.error(e);
    throw e;
  }
}
