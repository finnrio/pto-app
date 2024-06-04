import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export default async function DenyPTO(userId: string, ptoId: string) {
  const { NODE_ENV } = process.env;

  const ptoDoc = doc(FIRESTORE_DB, `${NODE_ENV}`, userId, "pto", ptoId);
  const ptoDocData = (await getDoc(ptoDoc)).data();
  if (!ptoDocData) {
    throw new Error("PTO does not exist");
  }

  updateDoc(ptoDoc, { status: "Denied" });

  // remove hours from users pending_pto
  const userDoc = doc(FIRESTORE_DB, `${NODE_ENV}`, userId);
  const userDocData = (await getDoc(userDoc)).data();
  if (!userDocData) {
    throw new Error("User does not exist");
  }
  const { pto_pending } = userDocData; // eslint-disable-line camelcase
  const { hours } = ptoDocData;

  updateDoc(userDoc, {
    pto_pending: pto_pending - hours, // eslint-disable-line camelcase
  });
}
