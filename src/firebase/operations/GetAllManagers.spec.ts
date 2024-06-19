import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import GetAllManagers from "./GetAllManagers";

const { NODE_ENV } = process.env;
const testManagerId1 = "testUid1";
const testManager1DocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testManagerId1);
const testManagerId2 = "testUid2";
const testManager2DocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testManagerId2);
const testUserId = "testUid3";
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);

describe("GetAllManagers", () => {
  beforeAll(async () => {
    await setDoc(testManager1DocRef, { first_name: "testUser", surname: "1", role: "Manager"});
    await setDoc(testManager2DocRef, { first_name: "testUser", surname: "2", role: "Manager"});
    await setDoc(testUserDocRef, { first_name: "testUser", surname: "3", role: "User"});
  });
  afterAll(async () => {
    await deleteDoc(testManager1DocRef);
    await deleteDoc(testManager2DocRef);
    await deleteDoc(testUserDocRef);
  });
  it("should return all managers in the format required for the DropDownPicker", async () => {
    const res = await GetAllManagers();
    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: testManagerId1 }),
        expect.objectContaining({ value: testManagerId2 }),
      ])
    );
    expect(res).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: testUserId }),
      ])
    );
  });
});
