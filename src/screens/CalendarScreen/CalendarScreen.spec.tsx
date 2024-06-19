import React from "react";
import { render } from "@testing-library/react-native";
import { User } from "firebase/auth";
import { createMock } from "@golevelup/ts-jest";
import { NavigationContainer } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import CalendarScreen from "./CalendarScreen";

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
    props.children,
}));

// // solution from https://github.com/expo/expo/issues/21434#issuecomment-1450781966
// jest.mock("expo-font"); // this needed?

const navigation = {
  navigate: jest.fn(),
};

const mockAuthUser: User = createMock<User>({ uid: "mock_uid" });

describe("CalendarScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders correctly", () => {
    const { toJSON } = render(
      <NavigationContainer>
        <UserContext.Provider value={mockAuthUser}>
          <CalendarScreen navigation={navigation} />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
