import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';
import 'react-native-gesture-handler/jestSetup';

// solution from https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-1023551697
jest.mock("react-native-keyboard-aware-scroll-view", () => {
  return {
    KeyboardAwareScrollView: (props: { children: React.ReactNode }) =>
      props.children,
  };
});

jest.mock('./src/firebase/firebaseConfig', () => ({
  FIREBASE_AUTH: {
    onAuthStateChanged: jest.fn(),
  },
}));

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('calls onAuthStateChanged when authentication state changes', () => {
    render(<App/>);
    expect(require('./src/firebase/firebaseConfig').FIREBASE_AUTH.onAuthStateChanged).toHaveBeenCalled();
  });

  it('renders HomeScreen if user is authenticated', () => {
    require('./src/firebase/firebaseConfig').FIREBASE_AUTH.onAuthStateChanged.mockImplementationOnce((handler: any) =>
      handler({ uid: '123', displayName: 'Test User' } as any)
    );
    const { getByText } = render(<App/>);
    expect(getByText('Home')).toBeTruthy();
  });

  it('renders LoginScreen if user is not authenticated', () => {
    require('./src/firebase/firebaseConfig').FIREBASE_AUTH.onAuthStateChanged.mockImplementationOnce((handler: any) =>
      handler(null)
    );
    const { getByText } = render(<App />);
    expect(getByText('Login')).toBeTruthy();
  });
});
