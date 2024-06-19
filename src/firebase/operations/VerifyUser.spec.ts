import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { createMock } from "@golevelup/ts-jest";
import { v4 as uuidV4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";
import { AppUser } from "../../types/AppUser";
import VerifyUser from "./VerifyUser";

const { NODE_ENV } = process.env;
const testUserId = uuidV4();
const testUser: AppUser = createMock<AppUser>();
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);

describe("VerifyUser", () => {
  beforeAll(async () => {
    await setDoc(testUserDocRef, testUser);
  });
  afterAll(async () => {
    await deleteDoc(testUserDocRef);
  });
  it("should return true if the user exists", async () => {
    expect(await VerifyUser(testUserId)).toBe(true);
  });
  it("should throw an error if the user does not exist", async () => {
    await expect(VerifyUser("nonExistentUser")).rejects.toThrow(
      "User not found",
    );
  });
});
