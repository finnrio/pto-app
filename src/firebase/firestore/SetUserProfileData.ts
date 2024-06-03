import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function SetUserProfileData(data: any, id: any) {
  try {
    await updateDoc(doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, id), data);
  } catch (e) {
    console.error("Error updating user details: ", e);
  }
}
