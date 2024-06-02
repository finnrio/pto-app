import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";

export default async function CreatePTORequest(
  startDate: Date,
  endDate: Date,
  reason: string,
  managerId: string,
) {
  const { currentUser } = FIREBASE_AUTH;
  const { NODE_ENV } = process.env;

  const ptoCollection = collection(
    FIRESTORE_DB,
    `${NODE_ENV}`,
    currentUser!.uid,
    "pto",
  );

  // Add a new document with a generated id.
  await addDoc(ptoCollection, {
    start_date: startDate.toISOString().split("T")[0],
    end_date: endDate.toISOString().split("T")[0],
    reason,
    status: "Pending",
  }).catch((error) => {
    console.error(error);
    throw error;
  });

  // Notify manager of new PTO request
  await addDoc(
    collection(FIRESTORE_DB, `${NODE_ENV}`, managerId, "notifications"),
    { user: currentUser!.uid, message: "New PTO request" },
  ).catch((error) => {
    console.error(error);
    throw error;
  });
}
