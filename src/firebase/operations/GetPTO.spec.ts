import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";
import GetPTO from "./GetPTO";

const { NODE_ENV } = process.env;
const testUserId = uuidV4();
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);

describe("GetPTO", () => {
  beforeAll(async () => {
    await setDoc(doc(testUserDocRef, "pto", "testPTOId1"), {
      status: "Pending",
    });
    await setDoc(doc(testUserDocRef, "pto", "testPTOId2"), {
      status: "Approved",
    });
    await setDoc(doc(testUserDocRef, "pto", "testPTOId3"), {
      status: "Denied",
    });
  });
  afterAll(async () => {
    await deleteDoc(doc(testUserDocRef, "pto", "testPTOId1"));
    await deleteDoc(doc(testUserDocRef, "pto", "testPTOId2"));
    await deleteDoc(doc(testUserDocRef, "pto", "testPTOId3"));
  });
  it("should return the user's PTO data", async () => {
    expect(await GetPTO(testUserId)).toEqual([
      { id: "testPTOId1", status: "Pending" },
      { id: "testPTOId2", status: "Approved" },
      { id: "testPTOId3", status: "Denied" },
    ]);
  });
});
