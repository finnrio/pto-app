import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";
import GetPTOByStatus from "./GetPTOByStatus";

const { NODE_ENV } = process.env;
const testUserId = uuidV4();
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);
const testPTOId = uuidV4();
const testPtoDocRef = doc(testUserDocRef, "pto", testPTOId);

describe("GetPTOByStatus", () => {
  beforeAll(async () => {
    await setDoc(testPtoDocRef, { status: "Pending" });
  });
  afterAll(async () => {
    await deleteDoc(testPtoDocRef);
  });
  it("should return an array of PTO requests with the specified status", async () => {
    expect(await GetPTOByStatus(testUserId, "Pending")).toEqual([
      { id: testPTOId, status: "Pending" },
    ]);
  });
});
