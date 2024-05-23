import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export default async function GetUserProfileData(id: string) {
  try {
    const docRef = await getDoc(
      doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, id),
    );
    return docRef.data();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
