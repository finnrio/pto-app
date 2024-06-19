import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import ApprovePTO from "./ApprovePTO";

const { NODE_ENV } = process.env;
const testUserId = "testUserId";
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);

describe("ApprovePTO", () => {
  beforeAll(async () => {
    // set pto request to be pending
    await setDoc(doc(testUserDocRef, "pto", "testPtoId"), { status: "Pending", hours: 8 });
    // set users pto_pending to be the same as the pto request
    // set users pto_used to be 0
    await setDoc(testUserDocRef, { pto_pending: 8, pto_used: 0});
  });
  afterAll(async () => {
    await deleteDoc(testUserDocRef);
  });
  describe("valid pto request", () => {
    beforeAll(async () => {
      await ApprovePTO("testUid", "testPtoId");
    });
    it("should update the pto status to approved", async () => {
      expect((await getDoc(doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, "testUid", "pto", "testPtoId"))).data()).toEqual(expect.objectContaining({ status: "Approved" }));
    });
    it("should remove the hours from the users pto_pending", async () => {
      expect((await getDoc(doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, "testUid"))).data()).toEqual(expect.objectContaining({ pto_pending: 0 }));
    });
    it("should add the hours from the users pto_used", async () => {
      expect((await getDoc(doc(FIRESTORE_DB, `${process.env.NODE_ENV}`, "testUid"))).data()).toEqual(expect.objectContaining({ pto_used: 8 }));
    });
  });
  describe("invalid pto request", () => {
    it("should error", async () => {
      await expect(ApprovePTO("testUid", "invalidPtoId")).rejects.toThrow("PTO does not exist");
    });
  });
  describe("invalid user", () => {
    it("should error", async () => {
      await expect(ApprovePTO("invalidUid", "testPtoId")).rejects.toThrow("User does not exist");
    });
  });
});

