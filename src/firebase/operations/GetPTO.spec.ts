import GetPTO from "./GetPTO";

describe("GetPTO", () => {
  it("should return the user's PTO data", async () => {
    expect(await GetPTO("testUid")).toEqual([{ id: "testPTOId", status: "Pending"}, { id: "testPTOId2", status: "Approved" }, { id: "testPtoId", status: "Approved", hours: 8}]);
  });
});