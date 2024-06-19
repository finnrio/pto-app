import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function GetPTOByStatus(userId: string, status: string) {
  const q = query(
    collection(FIRESTORE_DB, `${process.env.NODE_ENV}`, userId, "pto"),
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
