import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";
import React from "react";
import ManagerDashboardScreen from "./ManagerDashboardScreen";

const navigation = {
  navigate: jest.fn(),
};

describe("ManagerDashboardScreen", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it("matches the snapshot", () => {
    const tree = render(<ManagerDashboardScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("My Activity Button", () => {
    it("takes the user to the 'My Activity' screen", () => {
      render(<ManagerDashboardScreen navigation={navigation} />);
      fireEvent.press(screen.getByTestId("my_activity_btn"));
      expect(navigation.navigate).toHaveBeenCalledWith("My Activity");
    });
  });
  describe("Calendar Button", () => {
    it("takes the user to the 'Calendar' screen", () => {
      render(<ManagerDashboardScreen navigation={navigation} />);
      fireEvent.press(screen.getByTestId("calendar_btn"));
      expect(navigation.navigate).toHaveBeenCalledWith("Calendar");
    });
  });
  describe("Team Actvity Button", () => {
    it("takes the user to the 'Team Activity' screen", () => {
      render(<ManagerDashboardScreen navigation={navigation} />);
      fireEvent.press(screen.getByTestId("team_activity_btn"));
      expect(navigation.navigate).toHaveBeenCalledWith("Team Activity");
    });
  });
});
