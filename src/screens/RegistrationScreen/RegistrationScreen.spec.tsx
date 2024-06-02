import React from "react";
import { Alert } from "react-native";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  act,
} from "@testing-library/react-native";
import { FirebaseError } from "firebase/app";
import RegistrationScreen from "./RegistrationScreen";
import AddUser from "../../firebase/firestore/AddUser";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

jest.mock("../../firebase/firestore/GetAllManagers", () => {
  return jest.fn(() => {
    return Promise.resolve([
      { id: "1", first_name: "Manager", surname: "One" },
      { id: "2", first_name: "Manager", surname: "Two" },
    ]);
  });
});

jest.mock("../../firebase/firestore/AddUser", () => {
  return jest.fn(() => {
    return Promise.resolve();
  });
});

jest.mock("../../firebase/firestore/GetCurrentUserData", () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve({ role: "Administrator" });
  });
});

const spyAlert = jest.spyOn(Alert, "alert");

describe("RegistrationScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(<RegistrationScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders a blank registration form", async () => {
    render(<RegistrationScreen />);
    expect(screen.getByTestId("firstName_input").props.value).toBe("");
    expect(screen.getByTestId("surname_input").props.value).toBe("");
    expect(screen.getByTestId("email_input").props.value).toBe("");
    expect(screen.getByTestId("password_input").props.value).toBe("");
    expect(screen.getByTestId("user_button")).toBeTruthy();
    expect(screen.getByTestId("manager_button")).toBeTruthy();
    // expect(screen.getByTestId("manager_input")).toBeTruthy(); // This does not exist
    expect(screen.getByTestId("add_user_button")).toBeTruthy();
    expect(screen.getByTestId("reset_button")).toBeTruthy();
  });

  it("resets the form with the reset form button", async () => {
    render(<RegistrationScreen />);
    fireEvent.changeText(screen.getByTestId("firstName_input"), "John");
    fireEvent.press(screen.getByTestId("reset_button"));
    expect(screen.getByTestId("firstName_input").props.value).toBe("");
  });

  describe("when registering a new user", () => {
    describe("with a valid form", () => {
      beforeEach(async () => {
        render(<RegistrationScreen />);
        fireEvent.changeText(screen.getByTestId("firstName_input"), "John");
        fireEvent.changeText(screen.getByTestId("surname_input"), "Doe");
        fireEvent.changeText(
          screen.getByTestId("email_input"),
          "example@email.test",
        );
        fireEvent.changeText(screen.getByTestId("password_input"), "password");
        fireEvent.press(screen.getByTestId("user_button"));
        await act(() => {
          fireEvent.press(screen.getByTestId("add_user_button"));
        });
      });

      it("calls the backend AddUser method to register the user", () => {
        expect(AddUser).toHaveBeenCalled();
      });

      it("Alerts the user when the registration is successful", () => {
        expect(spyAlert).toHaveBeenCalledWith(
          "Success",
          "A new user has been successfully added to the system.",
        );
      });

      it("resets the form after a successful registration", () => {
        expect(screen.getByTestId("firstName_input").props.value).toBe("");
        expect(screen.getByTestId("surname_input").props.value).toBe("");
        expect(screen.getByTestId("email_input").props.value).toBe("");
        expect(screen.getByTestId("password_input").props.value).toBe("");
        expect(screen.getByTestId("user_button")).toBeTruthy();
        expect(screen.getByTestId("manager_button")).toBeTruthy();
        // expect(screen.getByTestId("manager_input")).toBeTruthy(); // This does not exist
        expect(screen.getByTestId("add_user_button")).toBeTruthy();
        expect(screen.getByTestId("reset_button")).toBeTruthy();
      });
    });

    describe("when the user is not an administrator", () => {
      beforeEach(async () => {
        require("../../firebase/firestore/GetCurrentUserData").mockImplementationOnce(
          () => {
            return Promise.resolve({ role: "User" });
          },
        );
        render(<RegistrationScreen />);
        fireEvent.changeText(screen.getByTestId("firstName_input"), "John");
        fireEvent.changeText(screen.getByTestId("surname_input"), "Doe");
        fireEvent.changeText(
          screen.getByTestId("email_input"),
          "example@email.test",
        );
        fireEvent.changeText(screen.getByTestId("password_input"), "password");
        fireEvent.press(screen.getByTestId("user_button"));
        await act(() => {
          fireEvent.press(screen.getByTestId("add_user_button"));
        });
      });

      it("should alert the user that they do not have permissions", async () => {
        expect(spyAlert).toHaveBeenCalledWith(
          "Permissions",
          "You do not have permissions for this action",
        );
      });
    });

    describe("when the form is incomplete", () => {
      beforeEach(async () => {
        render(<RegistrationScreen />);
        fireEvent.changeText(screen.getByTestId("firstName_input"), "John");
        fireEvent.changeText(screen.getByTestId("surname_input"), "Doe");
        await act(() => {
          fireEvent.press(screen.getByTestId("add_user_button"));
        });
      });

      it("should not call the AddUser method", () => {
        expect(AddUser).not.toHaveBeenCalled();
      });

      it("should alert the user that the form is incomplete", () => {
        expect(spyAlert).toHaveBeenCalledWith(
          "Error",
          "Please complete the form before submitting.",
        );
      });
    });

    describe("when the backend methods fails", () => {
      describe("when GetAllManagers fails", () => {
        beforeEach(async () => {
          require("../../firebase/firestore/GetAllManagers").mockImplementationOnce(
            () => {
              return Promise.reject(
                new FirebaseError("Error", "An error occurred"),
              );
            },
          );
          render(<RegistrationScreen />);
          fireEvent.changeText(screen.getByTestId("firstName_input"), "John");
          fireEvent.changeText(screen.getByTestId("surname_input"), "Doe");
          fireEvent.changeText(
            screen.getByTestId("email_input"),
            "example@email.test",
          );
          fireEvent.changeText(
            screen.getByTestId("password_input"),
            "password",
          );
          fireEvent.press(screen.getByTestId("user_button"));
          await act(() => {
            fireEvent.press(screen.getByTestId("add_user_button"));
          });
        });

        it("should alert the user that an error occurred for AddUser", async () => {
          expect(spyAlert).toHaveBeenCalledWith("Error", "An error occurred");
        });
      });

      describe("when AddUser fails", () => {
        beforeEach(async () => {
          require("../../firebase/firestore/AddUser").mockImplementationOnce(
            () => {
              return Promise.reject(
                new FirebaseError("Error", "An error occurred"),
              );
            },
          );
          render(<RegistrationScreen />);
          fireEvent.changeText(screen.getByTestId("firstName_input"), "John");
          fireEvent.changeText(screen.getByTestId("surname_input"), "Doe");
          fireEvent.changeText(
            screen.getByTestId("email_input"),
            "example@email.test",
          );
          fireEvent.changeText(
            screen.getByTestId("password_input"),
            "password",
          );
          fireEvent.press(screen.getByTestId("user_button"));
          await act(() => {
            fireEvent.press(screen.getByTestId("add_user_button"));
          });
        });

        it("should alert the user that an error occurred for AddUser", async () => {
          expect(spyAlert).toHaveBeenCalledWith("Error", "An error occurred");
        });
      });
    });
  });
});
