import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import React from "react";
import AdminDashboardScreen from "./AdminDashboardScreen";

const navigation = {
  navigate: jest.fn(),
};

describe("AdminDashboardScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it("matches the snapshot", () => {
    const tree = render(<AdminDashboardScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("User Management Button", () => {
    it("takes the user to the 'User Management' screen", () => {
      render(<AdminDashboardScreen navigation={navigation} />);
      fireEvent.press(screen.getByTestId("user_management_btn"));
      expect(navigation.navigate).toHaveBeenCalledWith("Admin User Management");
    });
  });
  describe("Register a User Button", () => {
    it("takes the user to the 'Register a User' screen", () => {
      render(<AdminDashboardScreen navigation={navigation} />);
      fireEvent.press(screen.getByTestId("register_user_btn"));
      expect(navigation.navigate).toHaveBeenCalledWith("Register a User");
    });
  });
});
