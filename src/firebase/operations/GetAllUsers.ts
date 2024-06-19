import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function GetAllUsers(): Promise<any[]> {
  const q = query(
    collection(FIRESTORE_DB, `${process.env.NODE_ENV}`),
    where("role", "==", "User"),
  );
  const querySnapshot = await getDocs(q);

  const res: any[] = [];

  querySnapshot.forEach((user) => {
    res.push({
      value: user.id,
      label: `${user.data().first_name} ${user.data().surname}`
    });
  });
  return res;
}
