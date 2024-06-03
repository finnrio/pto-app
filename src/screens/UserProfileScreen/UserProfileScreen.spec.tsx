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
import SetUserProfileData from "../../firebase/firestore/SetUserProfileData";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

const mockAuthUser: User = createMock<User>({ uid: "mock_uid" });

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

  it("updates the user's data when the update button is pressed", async () => {
    render(
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
      fireEvent.changeText(
        screen.getByTestId("firstName_input"),
        "new_first_name",
      );
      fireEvent.press(screen.getByTestId("update_btn"));
      // @ts-ignore
      spyAlert.mock.calls[0][2][0].onPress();
    });
    expect(SetUserProfileData).toHaveBeenCalled();
  });

  it("resets the user's data when the reset button is pressed", async () => {
    render(
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
      fireEvent.changeText(
        screen.getByTestId("firstName_input"),
        "new_first_name",
      );
      fireEvent.changeText(
        screen.getByTestId("surname_input"),
        "new_surname_name",
      );
      fireEvent.press(screen.getByTestId("update_btn"));
      // @ts-ignore
      spyAlert.mock.calls[0][2][1].onPress();
    });
    expect(await screen.findByDisplayValue("mock_uid")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_first_name")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_surname")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_email")).toBeTruthy();
    expect(await screen.findByDisplayValue("mock_role")).toBeTruthy();
  });

  it("alerts the user when the email is updated", async () => {
    render(
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
      fireEvent.changeText(screen.getByTestId("email_input"), "new_email");
      fireEvent.press(screen.getByTestId("update_btn"));
      // @ts-ignore
      spyAlert.mock.calls[0][2][0].onPress();
    });
    expect(spyAlert).toHaveBeenCalledWith(
      "This email will not be upated for the auth system",
    );
  });
});
