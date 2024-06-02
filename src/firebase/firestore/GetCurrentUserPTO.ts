import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";

export default async function GetCurrentUserPTO(): Promise<any[]> {
  const { currentUser } = FIREBASE_AUTH;
  const returnData: any[] = [];

  const ptoCollection = collection(
    FIRESTORE_DB,
    `${process.env.NODE_ENV}`,
    currentUser!.uid,
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
