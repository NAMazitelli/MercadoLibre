import React from 'react';
import { shallow } from 'enzyme';

import ErrorScreen from '../index';

describe('<ErrorScreen />', () => {
  it('Deberia renderizar un div', () => {
    const renderedComponent = shallow(<ErrorScreen />);
    expect(renderedComponent.length).toEqual(1);
  });
});
