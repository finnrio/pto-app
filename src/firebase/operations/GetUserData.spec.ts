import { faker } from "@faker-js/faker";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import GetUserData from "./GetUserData";

//TODO sort the imports or setup and afterall deletes for the GET operations

const { NODE_ENV } = process.env;
const testUserID: string = "testManagerId";
const randomTestUserData = {
  uid: "testManagerId", // "testUid" is a placeholder for the user's ID
  first_name: faker.person.firstName(),
  surname: faker.person.lastName(),
  email: faker.internet.email(),
  role: "User",
  manager_id: "", // "testManagerId" is a placeholder for the user's manager's ID
  pto_allowance: 180,
  pto_used: 0,
  pto_pending: 0,
};

describe("GetUserData", () => {
  beforeAll(async () => {
    await setDoc(
      doc(FIRESTORE_DB, `${NODE_ENV}`, testUserID),
      randomTestUserData,
    );
  });
  afterAll(async () => {
    await deleteDoc(doc(FIRESTORE_DB, `${NODE_ENV}`, testUserID));
  });
  it("should return the user's data", async () => {
    expect(await GetUserData(testUserID)).toEqual(randomTestUserData);
  });
  it("should throw an error if the user does not exist", async () => {
    await expect(GetUserData("invalidUid")).rejects.toThrow(
      "Error retrieving current user information: User not found",
    );
  });
});
