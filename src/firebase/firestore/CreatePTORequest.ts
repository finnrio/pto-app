import { addDoc, collection, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";

function calculateHours(startDate: Date, endDate: Date): number {
  // Parse the start and end dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Ensure the start date is before the end date
  if (start > end) {
    throw new Error("Start date must be before end date.");
  }

  let count = 0; // Counter for weekdays

  while (start <= end) {
    const dayOfWeek = start.getDay();
    if (dayOfWeek > 0 && dayOfWeek < 6) {
      count += 1;
    }
    start.setDate(start.getDate() + 1);
  }

  return count * 8;
}

export default async function CreatePTORequest(
  startDate: Date,
  endDate: Date,
  reason: string,
  managerId: string,
) {
  const { currentUser } = FIREBASE_AUTH;
  const { NODE_ENV } = process.env;

  if (!currentUser) {
    throw new Error("No user logged in");
  }

  const hours = calculateHours(startDate, endDate);

  const userDoc = doc(FIRESTORE_DB, `${NODE_ENV}`, currentUser.uid);

  // check user has enough available pto

  const ptoCollection = collection(userDoc, "pto");

  // Add a new document with a generated id.
  await addDoc(ptoCollection, {
    start_date: startDate.toISOString().split("T")[0],
    end_date: endDate.toISOString().split("T")[0],
    reason,
    status: "Pending",
    user_id: currentUser.uid,
    hours,
  }).catch((error) => {
    console.error("Error adding pto event:\n", error);
    throw error;
  });

  // Notify manager of new PTO request
  await addDoc(
    collection(FIRESTORE_DB, `${NODE_ENV}`, managerId, "notifications"),
    { user: currentUser.uid, message: "New PTO request" },
  ).catch((error) => {
    console.error("Error adding notification for manager:\n", error);
    throw error;
  });

  // Update pto_pending in the user's document and remove from pto_available
  // await setDoc(
  //   doc(FIRESTORE_DB, `${NODE_ENV}`, currentUser.uid),
  //   { pto_pending: pto_pending + hours}
  // )
}
