import React from "react";
import { render } from "@testing-library/react-native";
import UserProfileScreen from "./UserProfileScreen";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

// solution from https://github.com/expo/expo/issues/21434#issuecomment-1450781966
jest.mock("expo-font");

describe("UserProfileScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders correctly", () => {
    const tree = render(<UserProfileScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
