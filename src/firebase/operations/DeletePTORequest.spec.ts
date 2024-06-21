import { setDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";
import DeletePTORequest from "./DeletePTORequest";

const { NODE_ENV } = process.env;
const testUserId = uuidV4();
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);
const testPtoId = uuidV4();
const testPtoDocRef = doc(testUserDocRef, "pto", testPtoId);

describe("DeletePTORequest", () => {
  afterAll(async () => {
    await deleteDoc(testPtoDocRef);
    await deleteDoc(testUserDocRef);
  });
  describe("when the pto request is pending", () => {
    beforeAll(async () => {
      await setDoc(testUserDocRef, { pto_pending: 10 });
      await setDoc(testPtoDocRef, { status: "Pending", hours: 10 });
      await DeletePTORequest(testUserId, testPtoId);
    });
    afterAll(async () => {
      await deleteDoc(testUserDocRef);
      await deleteDoc(testPtoDocRef);
    });
    it("should decrement the user's pto pending", async () => {
      expect((await getDoc(testUserDocRef)).data()?.pto_pending).toBe(0);
    });
    it("should delete the pto request", async () => {
      expect((await getDoc(testPtoDocRef)).data()).toBeUndefined();
    });
  });
  describe("when the pto request is approved", () => {
    beforeAll(async () => {
      await setDoc(testUserDocRef, { pto_used: 10 });
      await setDoc(testPtoDocRef, { status: "Approved", hours: 10 });
      await DeletePTORequest(testUserId, testPtoId);
    });
    afterAll(async () => {
      await deleteDoc(testUserDocRef);
      await deleteDoc(testPtoDocRef);
    });
    it("should decrement the user's pto pending", async () => {
      expect((await getDoc(testUserDocRef)).data()?.pto_used).toBe(0);
    });
    it("should delete the pto request", async () => {
      expect((await getDoc(testPtoDocRef)).data()).toBeUndefined();
    });
  });
  describe("when the user does not exist", () => {
    it("should throw an error", async () => {
      await expect(DeletePTORequest("invalidUid", testPtoId)).rejects.toThrow(
        "User not found",
      );
    });
  });
  describe("when the pto request does not exist", () => {
    it("should throw an error", async () => {
      await setDoc(testUserDocRef, {});
      await expect(
        DeletePTORequest(testUserId, "invalidPtoId"),
      ).rejects.toThrow("PTO Request not found");
    });
  });
});
