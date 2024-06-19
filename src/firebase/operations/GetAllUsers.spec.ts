import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";
import GetAllUsers from "./GetAllUsers";

const { NODE_ENV } = process.env;
const testUserId1 = uuidV4();
const testUser1DocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId1);
const testUserId2 = uuidV4();
const testUser2DocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId2);
const testUserId3 = uuidV4();
const testUser3DocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId3);

describe("GetAllUsers", () => {
  beforeAll(async () => {
    await setDoc(testUser1DocRef, {
      first_name: "testUser",
      surname: "1",
      role: "User",
    });
    await setDoc(testUser2DocRef, {
      first_name: "testUser",
      surname: "2",
      role: "User",
    });
    await setDoc(testUser3DocRef, {
      first_name: "testUser",
      surname: "3",
      role: "NotUser",
    });
  });
  afterAll(async () => {
    await deleteDoc(testUser1DocRef);
    await deleteDoc(testUser2DocRef);
    await deleteDoc(testUser3DocRef);
  });
  it("should return all users in the format required for the DropDownPicker", async () => {
    expect(await GetAllUsers()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: testUserId1 }),
        expect.objectContaining({ value: testUserId2 }),
      ]),
    );
    expect(await GetAllUsers()).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ value: testUserId3 })]),
    );
  });
});
