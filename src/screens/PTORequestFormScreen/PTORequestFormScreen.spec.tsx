import React from "react";
import { Alert } from "react-native";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  act,
} from "@testing-library/react-native";
import PTORequestFormScreen from "./PTORequestFormScreen";
import { UserContext } from "../../context/UserContext";
import { User } from "firebase/auth";
import { createMock } from "@golevelup/ts-jest";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

jest.mock("../../firebase/operations/CreatePTORequest", () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve();
  });
});

const mockAuthUser: User = createMock<User>({ uid: "mock_uid" });

const navigation = {
  navigate: jest.fn(),
};

const startDate = "2024-01-01";
const endDate = "2024-01-02";
const route = {
  params: {
    startDate,
    endDate
  }
};

const spyAlert = jest.spyOn(Alert, "alert");

describe("PTORequestFormScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(
      <UserContext.Provider value={mockAuthUser}>
        <PTORequestFormScreen navigation={navigation} route={route}/>
      </UserContext.Provider>
      );
    expect(toJSON()).toMatchSnapshot();
  });
  it("renders the PTO request form with passed in dates", async () => {
    render(
      <UserContext.Provider value={mockAuthUser}>
        <PTORequestFormScreen navigation={navigation} route={route}/>
      </UserContext.Provider>
    );
    expect(screen.getByTestId("startDate_input").props.value).toBe(startDate);
    expect(screen.getByTestId("endDate_input").props.value).toBe(endDate);
    expect(screen.getByTestId("purpose_input").props.value).toBe("");
    expect(screen.getByTestId("submit_btn")).toBeTruthy();
    expect(screen.getByTestId("cancel_btn")).toBeTruthy();
  });
  it("submits the PTO request", async () => {
    const purpose = "mock purpose";
    render(
      <UserContext.Provider value={mockAuthUser}>
        <PTORequestFormScreen navigation={navigation} route={route}/>
      </UserContext.Provider>
    );
    fireEvent.changeText(screen.getByTestId("purpose_input"), purpose);
    fireEvent.press(screen.getByTestId("submit_btn"));
    expect(require("../../firebase/operations/CreatePTORequest")).toHaveBeenCalledWith(
      "mock_uid",
      new Date(startDate),
      new Date(endDate),
      purpose
    );
    expect(navigation.navigate).toHaveBeenCalledWith("Calendar");
  });
  it("alerts the user if CreatePTOEvent fails", async () => {
    const purpose = "mock purpose";
    require("../../firebase/operations/CreatePTORequest").mockImplementationOnce( () => {
      return Promise.reject(new Error("mock error"));
    });
    render(
      <UserContext.Provider value={mockAuthUser}>
        <PTORequestFormScreen navigation={navigation} route={route}/>
      </UserContext.Provider>
    );
    await act(async () => {
      await fireEvent.changeText(screen.getByTestId("purpose_input"), purpose);
      await fireEvent.press(screen.getByTestId("submit_btn"));
    })
    expect(spyAlert).toHaveBeenCalledWith("Error", "mock error");
  });
  it("should alert the user when purpose is empty", async () => {
    render(
      <UserContext.Provider value={mockAuthUser}>
        <PTORequestFormScreen navigation={navigation} route={route}/>
      </UserContext.Provider>
    );
    fireEvent.press(screen.getByTestId("submit_btn"));
    expect(spyAlert).toHaveBeenCalledWith("Purpose is required", "Please enter a purpose for your PTO request");
  });
  it("should return the user to the calendar screen on cancel", async () => {
    render(
      <UserContext.Provider value={mockAuthUser}>
        <PTORequestFormScreen navigation={navigation} route={route}/>
      </UserContext.Provider>
    );
    fireEvent.press(screen.getByTestId("cancel_btn"));
    expect(navigation.navigate).toHaveBeenCalledWith("Calendar");
  });
});