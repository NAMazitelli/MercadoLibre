import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
  LOAD_SINGLE_PRODUCT,
  LOAD_SINGLE_PRODUCT_SUCCESS,
  LOAD_SINGLE_PRODUCT_ERROR,
  CHANGE_QUERY,
  CHANGE_CATEGORY
} from '../constants';

import {
  loadProducts,
  productsLoaded,
  productsLoadingError,
  loadSingleProduct,
  singleProductLoaded,
  singleProductLoadingError,
  changeQuery,
  changeCategory
} from '../actions';

describe('Acciones de la App', () => {
  describe('loadProducts', () => {
    it('Deberia devolver el tipo de accion correcto si no se le manda query', () => {
      const expectedResult = {
        type: LOAD_PRODUCTS,
      };

      expect(loadProducts()).toEqual(expectedResult);
    });
    it('Deberia devolver el tipo de accion correcto si se le manda query', () => {
      const query = 'test';
      const expectedResult = {
        type: LOAD_PRODUCTS,
        query
      };

      expect(loadProducts(query)).toEqual(expectedResult);
    });
  });

  describe('productsLoaded', () => {
    it('Deberia devolver el tipo correcto y los productos', () => {
      const fixture = ['Test'];
      const expectedResult = {
        type: LOAD_PRODUCTS_SUCCESS,
        products: fixture
      };

      expect(productsLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('productsLoadingError', () => {
    it('Deberia devolver el tipo correcto y el error', () => {
      const fixture = {
        error: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_PRODUCTS_ERROR,
        error: fixture,
      };

      expect(productsLoadingError(fixture)).toEqual(expectedResult);
    });
  });

  describe('loadSingleProduct', () => {
    it('Deberia devolver el tipo de accion correcto', () => {
      const queryId = 'MLA757934898';
      const expectedResult = {
        type: LOAD_SINGLE_PRODUCT,
        queryId
      };

      expect(loadSingleProduct(queryId)).toEqual(expectedResult);
    });
  });

  describe('singleProductLoaded', () => {
    it('Deberia devolver el tipo correcto y los productos', () => {
      const fixture = {
        item: {}
      };
      const expectedResult = {
        type: LOAD_SINGLE_PRODUCT_SUCCESS,
        product: fixture
      };

      expect(singleProductLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('singleProductLoadingError', () => {
    it('Deberia devolver el tipo correcto y el error', () => {
      const fixture = 'Something went wrong!';
      const expectedResult = {
        type: LOAD_SINGLE_PRODUCT_ERROR,
        error: fixture,
      };

      expect(singleProductLoadingError(fixture)).toEqual(expectedResult);
    });
  });

  describe('changeQuery', () => {
    it('Deberia devolver el tipo de accion correcto', () => {
      const query = 'test';
      const expectedResult = {
        type: CHANGE_QUERY,
        query
      };

      expect(changeQuery(query)).toEqual(expectedResult);
    });
  });

  describe('changeCategory', () => {
    it('Deberia devolver el tipo de accion correcto', () => {
      const category = ['test'];
      const expectedResult = {
        type: CHANGE_CATEGORY,
        category
      };

      expect(changeCategory(category)).toEqual(expectedResult);
    });
  });
});
