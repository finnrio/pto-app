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
import UpdateUserData from "../../firebase/operations/UpdateUserData";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

jest.mock("../../firebase/operations/GetUserData", () => {
  return jest.fn(() => {
    return Promise.resolve({
      first_name: "mock_first_name",
      surname: "mock_surname",
      email: "mock_email",
      role: "mock_role",
    });
  });
});

jest.mock("../../firebase/operations/UpdateUserData", () => {
  return jest.fn();
});

const mockAuthUser: User = createMock<User>({ uid: "mock_uid" });

const spyAlert = jest.spyOn(Alert, "alert");

describe("UserProfileScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(
      <UserContext.Provider value={mockAuthUser}>
        <UserProfileScreen />
      </UserContext.Provider>,
    );
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
  it("user id and role should not be editable", async () => {
    render(
      <UserContext.Provider value={mockAuthUser}>
        <UserProfileScreen />
      </UserContext.Provider>,
    );
    expect(screen.getByTestId("user_id_input").props.editable).toBeFalsy();
    expect(screen.getByTestId("role_input").props.editable).toBeFalsy();
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
    expect(UpdateUserData).toHaveBeenCalled();
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
    expect(spyAlert).toHaveBeenLastCalledWith(
      "Warning",
      "This email will not be upated for the auth system. Please contact system Administrators",
    );
  });
});
