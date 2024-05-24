import React from "react";
import { render } from "@testing-library/react-native";

import EmployeeActivityScreen from "./EmployeeActivityScreen";

// solution from https://github.com/expo/expo/issues/21434#issuecomment-1450781966
jest.mock("expo-font");

describe("EmployeeActivityScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders correctly", () => {
    const tree = render(<EmployeeActivityScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
