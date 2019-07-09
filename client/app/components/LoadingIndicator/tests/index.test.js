import React from 'react';
import { render } from 'enzyme';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('Deberia renderizar un div', () => {
    const renderedComponent = render(<LoadingIndicator />);
    expect(renderedComponent.length).toBe(1);
  });
});
