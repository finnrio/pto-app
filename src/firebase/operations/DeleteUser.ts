import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function DeleteUser(uid: string) {
  await deleteDoc(doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, uid));
}
