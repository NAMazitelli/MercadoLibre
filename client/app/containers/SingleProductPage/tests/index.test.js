/**
 * Testeo de SingleProductPage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import Product from 'components/Product';
import SingleProductPage from '../SingleProductPage';
import { mapDispatchToProps } from '../index';
import { loadSingleProduct } from '../../App/actions';

describe('<SingleProductPage />', () => {
  it('Deberia renderizar la descripción de un producto', () => {
    const product = { name: 'Test' };
    const renderedComponent = shallow(
      <SingleProductPage loading error={false} product={product} />
    );
    expect(
      renderedComponent.contains(<Product loading error={false} product={product} />)
    ).toEqual(true);
  });

  it('Deberia buscar el producto por ID si se lo mandamos', () => {
    const submitSpy = jest.fn();
    mount(
      <SingleProductPage
        match={{ params: { id: 'MLA733099149' } }}
        onChangeProduct={submitSpy}
      />
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('No deberia buscar el producto si no hay id', () => {
    const submitSpy = jest.fn();
    mount(<SingleProductPage onChangeProduct={submitSpy} />);
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('No deberia buscar el producto si el id es null', () => {
    const submitSpy = jest.fn();
    mount(
      <SingleProductPage
        id=""
        onChangeProduct={submitSpy}
      />
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeProduct', () => {
      it('Deberia ser inyectado', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeProduct).toBeDefined();
      });

      it('Deberia llamar a loadSingleProduct', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onChangeProduct();
        expect(dispatch).toHaveBeenCalledWith(loadSingleProduct());
      });
    });
  });
});
