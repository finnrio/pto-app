import GetPTOByStatus from "./GetPTOByStatus";

describe("GetPTOByStatus", () => {
  it("should return an array of PTO requests with the specified status", async () => {
    expect(await GetPTOByStatus("testUid", "Pending")).toEqual([{ id: "testPTOId", status: "Pending" }]);
  });
});