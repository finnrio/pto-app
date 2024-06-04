import React from "react";
import { render } from "@testing-library/react-native";

import UserSettingsScreen from "./UserSettingsScreen";

// solution from https://github.com/expo/expo/issues/21434#issuecomment-1450781966
jest.mock("expo-font");

describe("UserSettingsScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders correctly", () => {
    const tree = render(<UserSettingsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
