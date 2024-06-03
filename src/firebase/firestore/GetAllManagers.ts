import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function GetAllManagers(): Promise<any[]> {
  try {
    const q = query(
      collection(FIRESTORE_DB, `${process.env.NODE_ENV}`),
      where("role", "==", "Manager"),
    );
    const querySnapshot = await getDocs(q);

    const res: any[] = [];

    querySnapshot.forEach((manager) => {
      res.push({
        value: manager.id,
        label: `${manager.data().first_name} ${manager.data().surname}`,
        testID: manager.id, // unsure if this is necessary
        key: manager.id, // unsure if this is necessary
      });
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
