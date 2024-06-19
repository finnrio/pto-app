import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import GetPTO from "./GetPTO";

const { NODE_ENV } = process.env;
const testUserId = "testUid";
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
    expect(await GetPTO("testUid")).toEqual([
      { id: "testPTOId1", status: "Pending" },
      { id: "testPTOId2", status: "Approved" },
      { id: "testPTOId3", status: "Denied" },
    ]);
  });
});
