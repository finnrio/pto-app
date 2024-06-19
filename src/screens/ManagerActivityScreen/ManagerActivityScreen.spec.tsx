import { cleanup, render, screen } from "@testing-library/react-native";
import React from "react";
import { User } from "firebase/auth";
import { createMock } from "@golevelup/ts-jest";
import { NavigationContainer } from "@react-navigation/native";
import ManagerActivityScreen from "./ManagerActivityScreen";
import { UserContext } from "../../context/UserContext";

jest.mock("../../firebase/operations/GetSubordinates", () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve([{ id: "subordinate1" }]);
  });
});
jest.mock("../../firebase/operations/GetPTOByStatus", () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve([
      {
        id: "subordinate1Pto7",
        start_date: "2024-01-01",
        end_date: "2024-01-02",
      },
      {
        id: "subordinate1Pto8",
        start_date: "2024-01-01",
        end_date: "2024-01-02",
      },
      {
        id: "subordinate1Pto9",
        start_date: "2024-01-01",
        end_date: "2024-01-02",
      },
    ]);
  });
});

const mockAuthUser: User = createMock<User>({ uid: "mock_uid" });

describe("ManagerActivityScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it("renders correctly", () => {
    const { toJSON } = render(
      <NavigationContainer>
        <UserContext.Provider value={mockAuthUser}>
          <ManagerActivityScreen />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("renders the team's activity", async () => {
    render(
      <NavigationContainer>
        <UserContext.Provider value={mockAuthUser}>
          <ManagerActivityScreen />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    expect(
      screen.getByTestId("pending_accordion").children.length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByTestId("approved_accordion").children.length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByTestId("denied_accordion").children.length,
    ).toBeGreaterThan(0);
  });
  // TODO working out how to select a child of the accordion
});
