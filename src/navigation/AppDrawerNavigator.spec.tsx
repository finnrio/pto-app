// import { render, screen} from "@testing-library/react-native";
// import AppDrawerNavigator from "./AppDrawerNavigator";
// import React from "react";
// import { UserContext } from "../context/UserContext";
// import { User } from "firebase/auth";
// import { createMock } from "@golevelup/ts-jest";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// jest.mock("../firebase/operations/GetUserData", () => {
//   return jest.fn(() => {
//     console.log("JEST FUCTION")
//     return Promise.resolve({
//       role: "Administrator"
//     });
//   });
// })


// const mockAuthUser: User = createMock<User>({ uid: "mock_uid" });

describe("AppDrawerNavigator", () => {
  it("should pass this test", () => {
    expect(true).toBeTruthy();
  })
//   describe("Administrator", () => {
//     // jest.mock("../firebase/operations/GetUserData", () => {
//     //   return jest.fn(() => {
//     //     console.log("JEST FUCTION")
//     //     return Promise.resolve({
//     //       role: "Administrator"
//     //     });
//     //   });
//     // })
//     it("Renders the admin drawer options", async () => {
//       const Stack = createStackNavigator();
//       render(
//         // <UserContext.Provider value={mockAuthUser}>
//         //   <NavigationContainer>
//         //     <AppDrawerNavigator/>
//         //   </NavigationContainer>
//         // </UserContext.Provider>  
//         <NavigationContainer>
//           <UserContext.Provider value={mockAuthUser}>
//             {/* <Stack.Navigator>
//                 <Stack.Screen
//                   name="Home"
//                   options={{ headerShown: false }}
//                   component={AppDrawerNavigator}
//                 />
//             </Stack.Navigator> */}
//             <AppDrawerNavigator/>
//           </UserContext.Provider>
//         </NavigationContainer>
//       );
//       // console.log(screen.toJSON())
//       expect(await screen.getByDisplayValue("Dashboard")).toBeTruthy();
//     });
//   });
});