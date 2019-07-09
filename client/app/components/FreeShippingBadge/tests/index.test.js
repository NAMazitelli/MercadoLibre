import React from 'react';
import { shallow } from 'enzyme';

import FreeShippingBadge from '../index';

describe('<FreeShippingBadge />', () => {
  it('Deberia renderizar un div', () => {
    const renderedComponent = shallow(<FreeShippingBadge />);
    expect(renderedComponent.length).toEqual(1);
  });
});
