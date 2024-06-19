import GetAllManagers from "./GetAllManagers";

describe("GetAllManagers", () => {
  it("should return all managers in the format required for the DropDownPicker", async () => {
    expect(await GetAllManagers()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: "testUid2" }),
      ])
    );
  });
});