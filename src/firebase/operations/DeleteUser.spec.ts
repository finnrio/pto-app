import { setDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";
import DeleteUser from "./DeleteUser";

const { NODE_ENV } = process.env;
const testUserId = uuidV4();
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);

describe("DeleteUser", () => {
  beforeAll(async () => {
    await setDoc(testUserDocRef, { first_name: "toBeDeleted" });
  });
  afterAll(async () => {
    await deleteDoc(testUserDocRef);
  });
  it("should delete the user", async () => {
    expect((await getDoc(testUserDocRef)).data()).toStrictEqual({
      first_name: "toBeDeleted",
    });
    await DeleteUser(testUserId);
    expect((await getDoc(testUserDocRef)).data()).toBeUndefined();
  });
});
