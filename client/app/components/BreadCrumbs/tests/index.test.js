import React from 'react';
import { shallow } from 'enzyme';

import BreadCrumbs from '../index';

describe('<BreadCrumbs />', () => {
  it('Deberia renderizar un div', () => {
    const renderedComponent = shallow(<BreadCrumbs category={[]} />);
    expect(renderedComponent.length).toEqual(1);
  });
  it('Deberia renderizar una categoria si se le pasa', () => {
    const renderedComponent = shallow(<BreadCrumbs category={['Test']} />);
    expect(renderedComponent.text()).toMatch('Test');
  });
  it('Deberia renderizar multiples categorias si se le pasan', () => {
    const renderedComponent = shallow(<BreadCrumbs category={['Test', 'Test2']} />);
    expect(renderedComponent.text()).toMatch('Test');
  });
});
