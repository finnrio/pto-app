import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";
import DenyPTO from "./DenyPTO";

const { NODE_ENV } = process.env;
const testUserId = uuidV4();
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);
const testPTOId = uuidV4();

describe("DenyPTO", () => {
  beforeAll(async () => {
    // set pto request to be pending
    await setDoc(doc(testUserDocRef, "pto", testPTOId), {
      status: "Pending",
      hours: 8,
    });
    // set users pto_pending to be the same as the pto request
    await setDoc(testUserDocRef, { pto_pending: 8 });
  });
  afterAll(async () => {
    await deleteDoc(testUserDocRef);
    await deleteDoc(doc(testUserDocRef, "pto", testPTOId));
  });
  describe("valid pto request", () => {
    beforeAll(async () => {
      await DenyPTO(testUserId, testPTOId);
    });
    it("should update the pto status to denied", async () => {
      expect(
        (await getDoc(doc(testUserDocRef, "pto", testPTOId))).data(),
      ).toEqual(expect.objectContaining({ status: "Denied" }));
    });
    it("should remove the hours from the users pto_pending", async () => {
      expect((await getDoc(testUserDocRef)).data()).toEqual(
        expect.objectContaining({ pto_pending: 0 }),
      );
    });
  });
  describe("invalid pto request", () => {
    it("should error", async () => {
      await expect(DenyPTO(testUserId, "invalidPtoId")).rejects.toThrow(
        "PTO does not exist",
      );
    });
  });
  describe("invalid user", () => {
    it("should error", async () => {
      await expect(DenyPTO("invalidUid", testPTOId)).rejects.toThrow(
        "User does not exist",
      );
    });
  });
});
