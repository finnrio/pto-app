import GetAllUsers from "./GetAllUsers";

describe("GetAllUsers", () => {
  it("should return all users in the format required for the DropDownPicker", async () => {
    expect(await GetAllUsers()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: "testUid1" }),
        expect.objectContaining({ value: "testUid3" }),
      ])
    );
  });
});
