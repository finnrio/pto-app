import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { FIRESTORE_DB } from "../firebaseConfig";
import GetSubordinates from "./GetSubordinates";

const { NODE_ENV } = process.env;
const testUserId = uuidV4();
const testSubordinateId1 = uuidV4();
const testSubordinateId2 = uuidV4();
const testSubordinate1DocRef = doc(
  FIRESTORE_DB,
  `${NODE_ENV}`,
  testSubordinateId1,
);
const testSubordinate2DocRef = doc(
  FIRESTORE_DB,
  `${NODE_ENV}`,
  testSubordinateId2,
);

describe("GetSubordinates", () => {
  beforeAll(async () => {
    await setDoc(testSubordinate1DocRef, { manager_id: testUserId });
    await setDoc(testSubordinate2DocRef, { manager_id: testUserId });
  });
  afterAll(async () => {
    await deleteDoc(testSubordinate1DocRef);
    await deleteDoc(testSubordinate2DocRef);
  });
  it("should return an array of subordinates", async () => {
    expect(await GetSubordinates(testUserId)).toEqual(expect.objectContaining([
      { id: testSubordinateId1 },
      { id: testSubordinateId2 },
    ]));
  });
  it("should return an empty array if the manager has no subordinates", async () => {
    expect(await GetSubordinates("badUserId")).toEqual([]);
  });
});
