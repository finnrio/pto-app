import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { AppUser } from "../../types/AppUser";
import GetUserDataById from "./GetUserDataById";

export default async function GetSubordinates(
  managerId: string,
): Promise<AppUser[]> {
  try {
    const docRef = await getDoc(
      doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, managerId),
    );

    const res: any[] = [];

    await docRef.data()?.subordinates?.forEach(async (subordinateId: any) => {
      GetUserDataById(subordinateId).then((userData) => {
        res.push({
          key: subordinateId,
          value: `${userData.first_name} ${userData.surname}`,
        });
      });
    });
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
