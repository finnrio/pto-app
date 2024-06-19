import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import CreatePTORequest from "./CreatePTORequest";

const { NODE_ENV } = process.env;
const testUserId = "testUserId";
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);

describe("CreatePTORequest", () => {
  describe("when successful", () => {
    let ptoUuid: string;
    let userDocData: any;
    beforeAll(async () => {
      await setDoc(testUserDocRef, { pto_allowance: 10000, pto_pending: 0, pto_used: 0 })
      ptoUuid = await CreatePTORequest(testUserId, new Date("2024-01-01"), new Date("2024-02-01"), "purpose");
      userDocData = (await getDoc(testUserDocRef)).data()
    });
    afterAll(async () => {
      await deleteDoc(doc(testUserDocRef, "pto", ptoUuid));
      await deleteDoc(testUserDocRef);
    });
    it("should generate a pto request", async () => {
      expect((await getDoc(doc(testUserDocRef, "pto", ptoUuid))).exists()).toBeTruthy();
    });
    it("should update users pending pto", async () => {
      expect(userDocData.pto_pending).toBeGreaterThan(0);
    });
  });
  describe("with an invalid user", () => {
    it("throws expected error", async () => {
      await expect(CreatePTORequest("invalidUserId", new Date("2024-01-01"), new Date("2024-02-01"), "purpose")).rejects.toThrow("No user data found");
    });
  });
  describe("insufficient allowance", () => {
    beforeAll(async () => {
      await setDoc(testUserDocRef, { pto_allowance: 100, pto_pending: 50, pto_used: 50 })
    });
    it("throws expected error", async () => {
      await expect(CreatePTORequest(testUserId, new Date("2024-01-01"), new Date("2024-02-01"), "purpose")).rejects.toThrow("Not enough PTO hours available");
    });
  });
  describe("when end date is before start date", () => {
    it("throws expected error", async () => {
      await expect(CreatePTORequest(testUserId, new Date("2024-02-01"), new Date("2024-01-01"), "purpose")).rejects.toThrow("Ending date must be after starting date");
    });
  });
});