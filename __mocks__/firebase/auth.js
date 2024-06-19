// __mocks__/firebase/auth.js
export const getAuth = jest.fn(() => {
  return {
    currentUser: { uid: 'testUid' },
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  };
});
