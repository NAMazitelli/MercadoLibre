/**
 * Busca el producto por el ID
 */

import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import { LOAD_SINGLE_PRODUCT } from 'containers/App/constants';
import { singleProductLoaded, singleProductLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectQueryId } from 'containers/App/selectors';

/**
 * Buscar el producto en la api
 */
export function* getSingleProduct() {
  // Selecciono el query del store
  const queryId = yield select(makeSelectQueryId());
  const requestURL = `http://localhost:9000/api/items/${queryId}`;
  try {
    // Llamo al request
    const product = yield call(request, requestURL);
    if (product === undefined || product.error) {
      yield put(singleProductLoadingError(product.error));
    } else {
      yield put(singleProductLoaded(product));
    }
  } catch (err) {
    yield put(singleProductLoadingError(err));
  }
}

/**
 * Funcion de saga que observa acciones de LOAD_SINGLE_PRODUCT
 */
export default function* singleProductData() {
  yield takeLatest(LOAD_SINGLE_PRODUCT, getSingleProduct);
}
