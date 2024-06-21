import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";

function calculateHours(startDate: Date, endDate: Date): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start > end) {
    throw new Error("Ending date must be after starting date");
  }
  let count = 0;
  while (start <= end) {
    const dayOfWeek = start.getDay();
    if (dayOfWeek > 0 && dayOfWeek < 6) {
      count += 1;
    }
    start.setDate(start.getDate() + 1);
  }
  return count * 8; // assumed 8 hours per day
}

export default async function CreatePTORequest(
  userId: string,
  startDate: Date,
  endDate: Date,
  reason: string,
) {
  const { NODE_ENV } = process.env;

  // Calculate the number of hours requested
  const requestedHours = calculateHours(startDate, endDate);

  // get the user's data
  const userDoc = doc(FIRESTORE_DB, `${NODE_ENV}`, userId);
  const loadedDoc = await getDoc(userDoc);
  if (!loadedDoc.exists()) {
    console.log("No user data found");
    throw new Error("No user data found");
  }

  // eslint-disable-next-line camelcase
  const { pto_allowance, pto_pending, pto_used } = loadedDoc.data();

  // check if the user has enough PTO hours available
  // eslint-disable-next-line camelcase
  if (pto_pending + pto_used + requestedHours > pto_allowance) {
    console.log("Not enough PTO hours available");
    throw new Error("Not enough PTO hours available");
  }

  const ptoCollection = collection(userDoc, "pto");

  // Add a new document with a generated id.
  const ptoUuid = uuidv4();
  await setDoc(doc(ptoCollection, ptoUuid), {
    start_date: startDate.toISOString().split("T")[0],
    end_date: endDate.toISOString().split("T")[0],
    reason,
    status: "Pending",
    user_id: userId,
    hours: requestedHours,
  });

  // Update pto_pending in the user's document and remove from pto_available
  await updateDoc(
    userDoc,
    { pto_pending: pto_pending + requestedHours }, // eslint-disable-line camelcase
  );
  return ptoUuid;
}
