import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import React from "react";
import UserDashboardScreen from "./UserDashboardScreen";

const navigation = {
  navigate: jest.fn(),
};

describe("UserDashboardScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it("matches the snapshot", () => {
    const tree = render(<UserDashboardScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("My Activity Button", () => {
    it("takes the user to the 'My Activity' screen", () => {
      render(<UserDashboardScreen navigation={navigation} />);
      fireEvent.press(screen.getByTestId("my_activity_btn"));
      expect(navigation.navigate).toHaveBeenCalledWith("My Activity");
    });
  });
  describe("Calendar Button", () => {
    it("takes the user to the 'Calendar' screen", () => {
      render(<UserDashboardScreen navigation={navigation} />);
      fireEvent.press(screen.getByTestId("calendar_btn"));
      expect(navigation.navigate).toHaveBeenCalledWith("Calendar");
    });
  });
});
