import { cleanup, render } from "@testing-library/react-native";
import React from "react";
import AdminUserProfileScreen from "./AdminUserProfileScreen";
import { UserContext } from "../../context/UserContext";
import { User } from "firebase/auth";
import { createMock } from "@golevelup/ts-jest";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

// mock the GetAllUsers function
jest.mock("../../firebase/operations/GetAllUsers", () => {
  return jest.fn(() => {
    return Promise.resolve([
      {
        id: "1",
        first_name: "User",
        surname: "One",
        email: "test@test.test",
        role: "User",
      },
      {
        id: "2",
        first_name: "User",
        surname: "Two",
        email: "test@test.test",
        role: "User",
      },
    ]);
  });
});

// mock the GetAllManagers function
jest.mock("../../firebase/operations/GetAllManagers", () => {
  return jest.fn(() => {
    return Promise.resolve([
      {
        id: "3",
        first_name: "Manager",
        surname: "One",
        email: "test@test.test",
        role: "Manager",
      },
      {
        id: "4",
        first_name: "Manager",
        surname: "Two",
        email: "test@test.test",
        role: "Manager",
      },
    ]);
  });
});

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

const mockAuthUser: User = createMock<User>({ uid: "mock_uid" });

describe("AdminUserProfileScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(
      <UserContext.Provider value={mockAuthUser}>
        <AdminUserProfileScreen />
      </UserContext.Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  // describe("when a user is selected", () => {
  // it("renders the user's data", async () => {
  //   // await act(async () => {
  //     render(<AdminUserProfileScreen />);
  //   // });
  //   const hook = renderHook(() => AdminUserProfileScreen());
  //   // await waitFor(() => expect(hook.result.current.allUsersList).toBe("User One"));
  //   // await act(async () => {
  //   //   await fireEvent.press(screen.getByText("Select a User"));
  //   // });
  //   // await act(async () => {
  //   //   await fireEvent.press(await screen.getByText("User One"));
  //   // });
  //   // get the data in the selected user SelectList component
  //   // await act(() => {
  //     // fireEvent.press(screen.getByTestId("user_dropdown").props.value);
  //   // });
  //   console.log(screen.getByTestId("user_dropdown").props.value);
  //   // await act(() => {
  //   //   fireEvent.press(screen.getByTestId("User One"));
  //   // });
  //   // await screen.getByTestId("user_dropdown").props.setValue("User One");
  //   // fireEvent.press(screen.getByTestId("User One"));
  //   // await fireEvent(userDropdown, 'onValueChange', 'User One');
  //   // console.log(screen.getByTestId("user_dropdown").children[0]);
  //   // console.log(screen.getByTestId("user_dropdown").children[0]);
  //   expect(screen.getByTestId("first_name_input")).toBeTruthy();
  //   // expect(screen.getByTestId("surname_input")).toBeTruthy();
  //   // expect(screen.getByTestId("email_input")).toBeTruthy();
  //   // expect(screen.getByTestId("role_input")).toBeTruthy();
  //   // expect(screen.getByTestId("update_button")).toBeTruthy();
  //   // expect(screen.getByTestId("delete_button")).toBeTruthy();
  // });
  // });
});
