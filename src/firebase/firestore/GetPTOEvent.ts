import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export async function GetPTOEventsByUserID(userId: string): Promise<any[]> {
  const returnData: any[] = [];

  const ptoCollection = collection(
    FIRESTORE_DB,
    `${process.env.NODE_ENV}`,
    userId,
    "pto",
  );
  await getDocs(ptoCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        returnData.push({
          ...doc.data(),
          id: doc.id,
        }),
      );
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  return returnData;
}
