/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_PRODUCTS } from 'containers/App/constants';
import { productsLoaded, productsLoadingError } from 'containers/App/actions';
import productsData, { getProducts } from '../saga';

const query = 'perros';

/* eslint-disable redux-saga/yield-effects */
describe('getProducts Saga', () => {
  let getProductsGenerator;
  beforeEach(() => {
    getProductsGenerator = getProducts();

    const selectDescriptor = getProductsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getProductsGenerator.next(query).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('Deberia disparar la accion productsLoaded si el response vino bien', () => {
    const response = {
      items: { },
    };
    const putDescriptor = getProductsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(productsLoaded(response)));
  });

  it('Deberia disparar la accion productsLoadingError si hubo errores', () => {
    const response = new Error('Some error');
    const putDescriptor = getProductsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(productsLoadingError(response)));
  });
});

describe('productsData Saga', () => {
  const productsDataSaga = productsData();

  it('Deberia observar la accion LOAD_PRODUCTS', () => {
    const takeLatestDescriptor = productsDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_PRODUCTS, getProducts));
  });
});
