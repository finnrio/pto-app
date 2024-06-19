import React from "react";
import { render } from "@testing-library/react-native";
import App from "./App";
import "react-native-gesture-handler/jestSetup";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

jest.mock("expo-font");

jest.mock("./src/firebase/firebaseConfig", () => ({
  FIREBASE_AUTH: {
    onAuthStateChanged: jest.fn(),
  },
}));

describe("App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("calls onAuthStateChanged when authentication state changes", () => {
    render(<App />);
    expect(
      require("./src/firebase/firebaseConfig").FIREBASE_AUTH.onAuthStateChanged,
    ).toHaveBeenCalled();
  });
});
