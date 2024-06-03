import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function GetUsersProfileColor(
  userId: string,
): Promise<any> {
  const docRef = await getDoc(
    doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, userId),
  );
  return docRef.data()?.user_color;
}
