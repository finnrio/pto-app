import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";
import ApprovePTO from "./ApprovePTO";

const { NODE_ENV } = process.env;
const testUserId = uuidV4();
const testPTOId = uuidV4();
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);

describe("ApprovePTO", () => {
  beforeAll(async () => {
    // set pto request to be pending
    await setDoc(doc(testUserDocRef, "pto", testPTOId), {
      status: "Pending",
      hours: 8,
    });
    // set users pto_pending to be the same as the pto request
    // set users pto_used to be 0
    await setDoc(testUserDocRef, { pto_pending: 8, pto_used: 0 });
  });
  afterAll(async () => {
    await deleteDoc(testUserDocRef);
    await deleteDoc(doc(testUserDocRef, "pto", testPTOId));
  });
  describe("valid pto request", () => {
    beforeAll(async () => {
      await ApprovePTO(testUserId, testPTOId);
    });
    it("should update the pto status to approved", async () => {
      expect(
        (await getDoc(doc(testUserDocRef, "pto", testPTOId))).data(),
      ).toEqual(expect.objectContaining({ status: "Approved" }));
    });
    it("should remove the hours from the users pto_pending", async () => {
      expect((await getDoc(testUserDocRef)).data()).toEqual(
        expect.objectContaining({ pto_pending: 0 }),
      );
    });
    it("should add the hours from the users pto_used", async () => {
      expect((await getDoc(testUserDocRef)).data()).toEqual(
        expect.objectContaining({ pto_used: 8 }),
      );
    });
  });
  describe("invalid pto request", () => {
    it("should error", async () => {
      await expect(ApprovePTO(testUserId, "invalidPtoId")).rejects.toThrow(
        "PTO does not exist",
      );
    });
  });
  describe("invalid user", () => {
    it("should error", async () => {
      await expect(ApprovePTO("invalidUid", testPTOId)).rejects.toThrow(
        "User does not exist",
      );
    });
  });
});
