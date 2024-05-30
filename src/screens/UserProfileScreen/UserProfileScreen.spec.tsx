import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import { User } from "firebase/auth";
import { createMock } from "@golevelup/ts-jest";
import UserProfileScreen from "./UserProfileScreen";
import { UserContext } from "../../context/UserContext";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

// create a mock User object with the firebase/auth user type
const mockAuthUser: User = createMock<User>({ uid: "mock_uid" });

// mock the GetCurrentUserData function to return a valid AppUser object
jest.mock("../../firebase/firestore/GetCurrentUserData", () => {
  return jest.fn(() => {
    return Promise.resolve({
      first_name: "mock_first_name",
      surname: "mock_surname",
      email: "mock_email",
      role: "mock_role",
    });
  });
});

// spy on the SetUserProfileData function
jest.mock("../../firebase/firestore/SetUserProfileData", () => {
  return jest.fn();
});

const spyAlert = jest.spyOn(Alert, "alert");

describe("UserProfileScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(<UserProfileScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the user's data", async () => {
    render(
      // user context provider with a value of a User object with a uid of "mock_uid"
      <UserContext.Provider value={mockAuthUser}>
        <UserProfileScreen />
      </UserContext.Provider>,
    );
    expect(await screen.findByDisplayValue("mock_uid")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_first_name")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_surname")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_email")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_role")).toBeTruthy();
  });

  // what tests do I need for this page that loads a users data and allows them to update it?

  // test that the user's data is updated when the update button is pressed
  it("updates the user's data when the update button is pressed", async () => {
    render(
      // user context provider with a value of a User object with a uid of "mock_uid"
      <UserContext.Provider value={mockAuthUser}>
        <UserProfileScreen />
      </UserContext.Provider>,
    );
    expect(await screen.findByDisplayValue("mock_uid")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_first_name")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_surname")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_email")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_role")).toBeTruthy();
    await act(async () => {
      // change mock data
      fireEvent.changeText(
        screen.getByTestId("firstName_input"),
        "new_first_name",
      );
      // press the update button
      fireEvent.press(screen.getByTestId("update_btn"));
      // press the Update button on the alert
      // @ts-ignore
      spyAlert.mock.calls[0][2][0].onPress();
    });
    // TODO expect createUserDataObject to be called
    // create a spy for createUserDataObject
    // const spyCreateUserDataObject = jest.spyOn(UserProfileScreen.prototype, "createUserDataObject");
    // expect(spyCreateUserDataObject).toHaveBeenCalled();
    // expect SetUserProfileData to be called with the new data
    expect(
      require("../../firebase/firestore/SetUserProfileData"),
    ).toHaveBeenCalled();
  });

  // test that the user's data is reset when the reset button is pressed
  it("resets the user's data when the reset button is pressed", async () => {
    render(
      // user context provider with a value of a User object with a uid of "mock_uid"
      <UserContext.Provider value={mockAuthUser}>
        <UserProfileScreen />
      </UserContext.Provider>,
    );
    expect(await screen.findByDisplayValue("mock_uid")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_first_name")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_surname")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_email")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_role")).toBeTruthy();
    await act(async () => {
      // change mock data
      fireEvent.changeText(
        screen.getByTestId("firstName_input"),
        "new_first_name",
      );
      // press the reset button
      fireEvent.press(screen.getByTestId("update_btn"));
      // @ts-ignore
      spyAlert.mock.calls[0][2][1].onPress();
    });
    // expect the user's data to be reset
    expect(await screen.findByDisplayValue("mock_uid")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_first_name")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_surname")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_email")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_role")).toBeTruthy();
  });

  // test that the user is alerted when the email is updated
  it("alerts the user when the email is updated", async () => {
    render(
      // user context provider with a value of a User object with a uid of "mock_uid"
      <UserContext.Provider value={mockAuthUser}>
        <UserProfileScreen />
      </UserContext.Provider>,
    );
    expect(await screen.findByDisplayValue("mock_uid")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_first_name")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_surname")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_email")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_role")).toBeTruthy();
    await act(async () => {
      // change mock data
      fireEvent.changeText(screen.getByTestId("email_input"), "new_email");
      // press the update button
      fireEvent.press(screen.getByTestId("update_btn"));
      // @ts-ignore
      spyAlert.mock.calls[0][2][0].onPress();
    });
    // expect the user to be alerted that the email will not be updated
    expect(spyAlert).toHaveBeenCalledWith(
      "This email will not be upated for the auth system",
    );
  });
});
