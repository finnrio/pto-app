import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { faker } from '@faker-js/faker';
import UpdateUserData from "./UpdateUserData";
import { FIRESTORE_DB } from "../firebaseConfig";
import { AppUser } from "../../types/AppUser";

const { NODE_ENV } = process.env;
const testUserId = "testUid";
const randomTestUserData: AppUser = {
  uid: testUserId,
  first_name: faker.person.firstName(),
  surname: faker.person.lastName(),
  email: faker.internet.email(),
  role: "User",
  pto_allowance: faker.number.int(),
  pto_used: 0,
  pto_pending: 0,
  user_color: faker.internet.color(),
};
const testUserDocRef = doc(FIRESTORE_DB, `${NODE_ENV}`, testUserId);

describe("UpdateUserData", () => {
  beforeAll(async () => {
    await setDoc(testUserDocRef, {});
  });
  afterAll(async () => {
    await deleteDoc(testUserDocRef);
  });
  it("should update the user's data", async () => {
    expect((await getDoc(testUserDocRef)).data()).not.toEqual(randomTestUserData);
    await UpdateUserData(randomTestUserData, testUserId)
    await expect((await getDoc(testUserDocRef)).data()).toEqual(randomTestUserData);
  });
  it("should not throw an error if the user does not exist", async () => {
    await expect(UpdateUserData(randomTestUserData, "nonExistentUser")).resolves.not.toThrow();
  });
});