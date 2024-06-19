import React from "react";
import { Alert } from "react-native";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import SignInWithEmailAndPassword from "../../firebase/operations/SignInWithEmailAndPassword";
import LoginScreen from "./LoginScreen";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

jest.mock("../../firebase/operations/SignInWithEmailAndPassword", () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve();
  });
});

const spyAlert = jest.spyOn(Alert, "alert");
describe("LoginScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(<LoginScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render email and password input fields", () => {
    render(<LoginScreen />);
    expect(screen.getByTestId("email_input")).toBeTruthy();
    expect(screen.getByTestId("password_input")).toBeTruthy();
  });

  it("should call signInWithEmailAndPassword method when login button is pressed with provided email and password", async () => {
    render(<LoginScreen />);
    const email = "test@test.test";
    const password = "Password123";
    fireEvent.changeText(screen.getByTestId("email_input"), email);
    fireEvent.changeText(screen.getByTestId("password_input"), password);
    fireEvent.press(screen.getByTestId("login_button"));
    expect(SignInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
  });

  it("should display an alert if an error occurs during sign in", async () => {
    require("../../firebase/operations/SignInWithEmailAndPassword").mockRejectedValueOnce(
      {
        code: "auth/invalid-email",
      },
    );
    render(<LoginScreen />);
    await fireEvent.press(screen.getByTestId("login_button"));
    expect(spyAlert).toHaveBeenCalledWith("auth/invalid-email");
  });
});
