import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";

export default async function GetCurrentUsersPTOByStatus(status: string) {
  const { currentUser } = FIREBASE_AUTH;

  if (!currentUser) {
    throw new Error("No user logged in");
  }

  const q = query(
    collection(FIRESTORE_DB, `${process.env.NODE_ENV}`, currentUser.uid, "pto"),
    where("status", "==", status),
  );

  const querySnapshot = await getDocs(q);

  const res: any[] = [];

  querySnapshot.forEach((pto) => {
    res.push({
      ...pto.data(),
      id: pto.id,
    });
  });
  return res;
}
