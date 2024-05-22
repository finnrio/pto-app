import React from "react";
import { Alert } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import * as auth from "firebase/auth";
import LoginScreen from "./LoginScreen";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

jest.mock("firebase/auth", () => ({
  __esModule: true,
  ...jest.requireActual("firebase/auth"),
}));

jest.spyOn(auth, "signInWithEmailAndPassword");

jest.spyOn(Alert, "alert");

describe("LoginScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render email and password input fields", () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("E-mail");
    const passwordInput = getByPlaceholderText("Password");
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it("should update email and password state when input changes", () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("E-mail");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, "test@test.com");
    fireEvent.changeText(passwordInput, "test12");

    expect(emailInput.props.value).toBe("test@test.com");
    expect(passwordInput.props.value).toBe("test12");
  });

  it("should call HandleLogin function when login button is pressed", async () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("E-mail");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, "test@test.com");
    fireEvent.changeText(passwordInput, "test12");

    fireEvent.press(getByText("Log in"));

    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth.getAuth(),
      "test@test.com",
      "test12",
    );
  });

  // There is an issue here with undici (a dependancy of firebase sdk?) and a typeerror with the waitFor from react native testing library

  // it('should display an alert if user does not exist', async () => {
  //   const { getByText, getByPlaceholderText } = render(<LoginScreen />);
  //   const emailInput = getByPlaceholderText('E-mail');
  //   const passwordInput = getByPlaceholderText('Password');

  //   fireEvent.changeText(emailInput, 'test@example.com');
  //   fireEvent.changeText(passwordInput, 'testpassword');

  //   fireEvent.press(getByText('Log in'));

  //   await waitFor(() => {
  //     expect(Alert.alert).toHaveBeenCalledWith('No user found with credentials provided');
  //   });
  // });
});
