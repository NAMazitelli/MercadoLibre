/**
 * Hace la busqueda por query
 */

import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import { LOAD_PRODUCTS } from 'containers/App/constants';
import { productsLoaded, productsLoadingError } from 'containers/App/actions';
import { makeSelectQuery } from 'containers/App/selectors';
import request from 'utils/request';
import history from 'utils/history';

export function* getProducts() {
  // Busco el query en el store...
  const query = yield select(makeSelectQuery());

  if (query && query.trim().length > 0) {
    // Cambio el URL
    history.push(`/items?search=${query}`);
    const requestURL = `http://localhost:9000/api/items?q=${query}&limit=4`;
    try {
      // Llamo al request
      const products = yield call(request, requestURL);
      yield put(productsLoaded(products));
    } catch (err) {
      yield put(productsLoadingError(err));
    }
  }
}

/**
 * Funcion de saga que observa acciones de LOAD_PRODUCTS
 */
export default function* productsData() {
  yield takeLatest(LOAD_PRODUCTS, getProducts);
}
