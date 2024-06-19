import GetSubordinates from "./GetSubordinates";

describe("GetSubordinates", () => {
  it("should return an array of subordinates", async () => {
    expect(await GetSubordinates("testManagerId")).toEqual([{ id: "testUid1" }, { id: "testUid2" }, { id: "testUid3" }]);
  });
  it("should return an empty array if the manager has no subordinates", async () => {
    expect(await GetSubordinates("testManagerId2")).toEqual([]);
  });
});