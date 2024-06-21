import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default async function DeletePTORequest(userId: string, ptoId: string) {
  const userDocRef = doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, userId);
  const userData = await getDoc(userDocRef);
  if (!userData.exists()) {
    throw new Error("User not found");
  }

  const ptoDocRef = doc(userDocRef, "pto", ptoId);
  await getDoc(ptoDocRef).then(async (docRef) => {
    if (!docRef.exists()) {
      throw new Error("PTO Request not found");
    } else if (docRef.data().status === "Pending") {
      updateDoc(userDocRef, {
        pto_pending: userData.data().pto_pending - docRef.data().hours,
      });
    } else if (docRef.data().status === "Approved") {
      updateDoc(userDocRef, {
        pto_used: userData.data().pto_used - docRef.data().hours,
      });
    }
    await deleteDoc(
      doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, userId, "pto", ptoId),
    );
  });
}
