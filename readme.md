# PTO Management App

This repository contains the source code for the Admin User Management Screen of a mobile application, designed to facilitate the management of user profiles within an organization. The application is built using React Native and leverages various libraries such as `react-native-keyboard-aware-scroll-view` and `react-native-dropdown-picker` to enhance the user interface and experience.

## Features

- **User List Display:** Dynamically renders lists of users and managers, allowing for easy access and management.
- **User Data Rendering:** Displays detailed information for selected users, enabling admins to view and manage user profiles effectively.
- **Dynamic User Management:** Supports operations such as adding, updating, and deleting user profiles.
- **Responsive Design:** Utilises `KeyboardAwareScrollView` to ensure that the UI is responsive and keyboard overlays do not obstruct input fields.
- **Dropdown Selection:** Incorporates `DropDownPicker` for a seamless selection experience when managing user roles and associations.

## Technologies Used

- **Frontend:** React Native, React Native Paper, React Navigation
- **Backend:** Google Firebase (Authentication, Firestore)
- **Testing:** Jest, React Native Testing Library, Firebase Emulators
- **State Management:** React Context API
- **Development Tools:** Visual Studio Code, Git, Yarn, Expo CLI, Firebase CLI (see versions [here](#prerequisites))

## Installation

### Prerequisites

- Git (v2.39.3)
- NPX (v10.7.0)
- Node.js (v20.14.0)
- Yarn (v1.22.22)
- Expo CLI (v0.17.11)
- Firebase CLI (v13.11.1)
- Jest (v29.7.0)

### To set up the project locally, follow these steps:

1. Clone the repository to your local machine.

`git clone https://github.com/finnrio/pto-app.git`

2. Navigate to the project directory

`cd pto-app`

3. Install the necessary dependencies.

`yarn install`

4. Start the application.

`yarn start`

## Usage

After starting the application, navigate to the Admin User Management Screen to begin managing user profiles. The interface allows for the selection of users from a dropdown list, viewing detailed user information, and performing management operations such as updating or deleting user profiles.

## Development

This project utilises Expo to create a development server for interacting and debugging the application.

## Testing

The `yarn test` command will run all automated tests managed by Jest. Ensure that Firebase emulators are running to provide a complete testing environment.

### Firebase Emulators

Emulators are used when testing integration with firebase to decouple testing data from production data and prevent any incurred costs. To start the firebase emulators run the following command:
`yarn start-firebase-emulators`

### React Native Testing Library

The @testing-library/react-native library is utilised in the tests for rendering the React Native DOM and testing application screens.

## Contributing

Contributions to not currently welcome to the PTO App.

## Contact

For any questions or feedback, please reach out to:

- Archie Sanger-Davies - GitHub: [finnrio](https://github.com/finnrio)
