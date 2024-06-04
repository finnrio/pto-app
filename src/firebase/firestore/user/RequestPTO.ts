import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

// test funciton
export default async function RequestPTO() {
  try {
    const docRef = await addDoc(
      collection(
        FIRESTORE_DB,
        `${process.env.NODE_ENV}`,
        "XKgOMI2e6UZByzF9pM8cgt5USIb2",
        "requests",
      ),
      {
        start: "test",
        end: "test",
      },
    );
    console.log(
      `Document written with ID: %s to collection: %s`,
      docRef.id,
      process.env.NODE_ENV,
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
