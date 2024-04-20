import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree: any = renderer.create(<App />).toJSON();
    expect(tree?.children?.length).toBe(1); // this fails currently as when app is created it is "initialising" which returns null
  });
});
