import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { AppUser } from "../../types/AppUser";

export default async function GetSubordinates(
  managerId: string,
): Promise<AppUser[]> {
  try {
    const q = query(
      collection(FIRESTORE_DB, `${process.env.NODE_ENV}`),
      where("manager_id", "==", managerId),
    );
    const querySnapshot = await getDocs(q);

    const res: any[] = [];

    querySnapshot.forEach((subordinate) => {
      res.push({
        id: subordinate.id,
      });
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
