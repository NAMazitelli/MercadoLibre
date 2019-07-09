/**
 * Test del SearchBox
 */

import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from '../SearchBox';
import { mapDispatchToProps } from '../index';
import { loadProducts, changeQuery } from '../../App/actions';

describe('<SearchBox />', () => {
  it('Deberia renderizar un searchbox', () => {
    const renderedComponent = shallow(<SearchBox />);
    expect(renderedComponent.length).toEqual(1);
  });

  it('Deberia renderizar un searchbox normal si location.search esta vacio', () => {
    const renderedComponent = shallow(<SearchBox location={{ search: '' }} />);
    expect(renderedComponent.length).toEqual(1);
  });

  it('Deberia renderizar un searchbox normal si location.search es igual al query', () => {
    const renderedComponent = shallow(<SearchBox location={{ search: 'test' }} query={'test'} />);
    expect(renderedComponent.length).toEqual(1);
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeQuery', () => {
      it('Deberia ser inyectado', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeQuery).toBeDefined();
      });

      it('Deberia llamar a changeQuery', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const query = 'perros';
        result.onChangeQuery({ target: { value: query } });
        expect(dispatch).toHaveBeenCalledWith(changeQuery(query));
      });
    });

    describe('onSubmitForm', () => {
      it('Deberia ser inyectado', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('Deberia llamar a loadProducts', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(loadProducts());
      });

      it('Deberia hacer preventDefault si viene con un evento', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});
