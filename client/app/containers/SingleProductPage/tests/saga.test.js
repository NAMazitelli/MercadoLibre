/**
 * Testeo de sagas de SingleProductPage
 */

import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_SINGLE_PRODUCT } from 'containers/App/constants';
import { singleProductLoaded, singleProductLoadingError } from 'containers/App/actions';
import singleProductData, { getSingleProduct } from '../saga';

const id = 'MLA733099149';

/* eslint-disable redux-saga/yield-effects */
describe('getSingleProduct Saga', () => {
  let getSingleProductGenerator;

  beforeEach(() => {
    getSingleProductGenerator = getSingleProduct();

    const selectDescriptor = getSingleProductGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getSingleProductGenerator.next(id).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('Deberia disparar la accion de singleProductLoaded si se puede traer la data', () => {
    const response = [{
      name: 'First item',
    }, {
      name: 'Second item',
    }];
    const putDescriptor = getSingleProductGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(singleProductLoaded(response, id)));
  });

  it('Deberia disparar la accion singleProductLoadingError si hubo errores', () => {
    const response = new Error('Some error');
    const putDescriptor = getSingleProductGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(singleProductLoadingError(response)));
  });
});

describe('singleProductData Saga', () => {
  const singleProductDataSaga = singleProductData();

  it('Deberia esperar acciones de LOAD_SINGLE_PRODUCT', () => {
    const takeLatestDescriptor = singleProductDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_SINGLE_PRODUCT, getSingleProduct));
  });
});
