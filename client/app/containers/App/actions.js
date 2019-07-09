/*
 * Acciones de la app
 */

import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
  LOAD_SINGLE_PRODUCT,
  LOAD_SINGLE_PRODUCT_SUCCESS,
  LOAD_SINGLE_PRODUCT_ERROR,
  CHANGE_QUERY,
  CHANGE_CATEGORY
} from './constants';

/**
 * Cargar los productos. Esta accion dispara la funcion saga de SearchBox
 *
 * @return {object} un objeto de accion LOAD_PRODUCTS. Si viene un query especifico, con ese query, si no con el que estaba en el estado
 */
export function loadProducts(query = '') {
  if (query !== '') {
    return {
      type: LOAD_PRODUCTS,
      query
    };
  }
  return {
    type: LOAD_PRODUCTS
  };
}
/**
 * Si se cargaron bien los productos, se dispara esta accion.
 *
 * @param  {object} products Los datos de los productos
 *
 * @return {object}      Un objeto de accion con los productos cargados.
 */
export function productsLoaded(products) {
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    products,
  };
}

/**
 * Si se cargaron mal los productos, se dispara esta accion
 *
 * @param  {object} error El error
 *
 * @return {object}       Un objeto de accion con el error.
 */
export function productsLoadingError(error) {
  return {
    type: LOAD_PRODUCTS_ERROR,
    error,
  };
}

/**
 * Cargar un producto por id. Esta accion dispara la funcion saga de SingleProductPage
 *
 * @return {object} un objeto de accion LOAD_SINGLE_PRODUCT con el Id que se pidio
 */
export function loadSingleProduct(queryId) {
  return {
    type: LOAD_SINGLE_PRODUCT,
    queryId
  };
}

/**
 * Si se cargo bien el producto, se dispara esta accion.
 *
 * @param  {object} product Los datos del producto
 *
 * @return {object}      Un objeto de accion con el producto cargado.
 */
export function singleProductLoaded(product) {
  return {
    type: LOAD_SINGLE_PRODUCT_SUCCESS,
    product,
  };
}


/**
 * Si se cargo mal el producto, se dispara esta accion
 *
 * @param  {object} error El error
 *
 * @return {object}       Un objeto de accion con el error.
 */
export function singleProductLoadingError(error) {
  return {
    type: LOAD_SINGLE_PRODUCT_ERROR,
    error,
  };
}
/**
 * Esta accion cambia la query del store por la que le mandamos.
 *
 * @return {object} un objeto de accion CHANGE_QUERY con el query ingresado
 */
export function changeQuery(query) {
  return {
    type: CHANGE_QUERY,
    query
  };
}
/**
 * Esta accion cambia la categoria del store por la que le mandamos. Usado para el breadcrumbs.
 *
 * @return {object} un objeto de accion CHANGE_CATEGORY con la categoria ingresada
 */
export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY,
    category
  };
}
