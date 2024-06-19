import React from "react";
import { render } from "@testing-library/react-native";

import { User } from "firebase/auth";
import { createMock } from "@golevelup/ts-jest";
import { NavigationContainer } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import EmployeeActivityScreen from "./EmployeeActivityScreen";

const mockAuthUser: User = createMock<User>({ uid: "mock_uid" });

describe("EmployeeActivityScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders correctly", () => {
    const { toJSON } = render(
      <NavigationContainer>
        <UserContext.Provider value={mockAuthUser}>
          <EmployeeActivityScreen />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
