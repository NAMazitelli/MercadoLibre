import appReducer from '../reducer';
import {
  loadProducts,
  productsLoaded,
  productsLoadingError,
  loadSingleProduct,
  singleProductLoaded,
  singleProductLoadingError,
  changeQuery
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      productData: {
        list: false,
        product: false,
      },
      category: '',
      query: '',
      queryId: ''
    };
  });

  it('Deberia devolver el estado inicial', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('Deberia devolver bien a la accion loadProducts', () => {
    const expectedResult = {
      ...state,
      loading: true,
      error: false,
      productData: {
        list: false,
        product: false,
      }
    };
    expect(appReducer(state, loadProducts())).toEqual(expectedResult);
  });

  it('Deberia devolver bien a la accion productsLoaded', () => {
    const fixture = {
      categories: '',
      items: [{}],
    };
    const expectedResult = {
      ...state,
      loading: false,
      productData: {
        list: fixture,
        product: false,
      },
      category: fixture.categories,
    };

    expect(appReducer(state, productsLoaded(fixture))).toEqual(
      expectedResult,
    );
  });

  it('Deberia devolver bien a la accion productsLoadingError', () => {
    const fixture = {
      error: 'Not found',
    };

    const expectedResult = {
      ...state,
      error: fixture,
      loading: false,
    };

    expect(appReducer(state, productsLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });

  it('Deberia devolver bien a la accion loadSingleProduct', () => {
    const queryId = 'MLA757934898';
    const expectedResult = {
      ...state,
      loading: true,
      error: false,
      productData: {
        list: false,
        product: false,
      },
      queryId
    };
    expect(appReducer(state, loadSingleProduct(queryId))).toEqual(expectedResult);
  });

  it('Deberia devolver bien a la accion singleProductLoaded', () => {
    const fixture = {
      item: {
        categories: ''
      }
    };
    const expectedResult = {
      ...state,
      loading: false,
      productData: {
        list: false,
        product: fixture,
      },
      category: fixture.item.categories,
    };

    expect(appReducer(state, singleProductLoaded(fixture))).toEqual(
      expectedResult,
    );
  });

  it('Deberia devolver bien a la accion singleProductLoadingError', () => {
    const fixture = {
      error: 'Not found',
    };

    const expectedResult = {
      ...state,
      error: fixture,
      loading: false,
    };

    expect(appReducer(state, singleProductLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });

  it('Deberia devolver bien a la accion changeQuery', () => {
    const query = 'test';
    const expectedResult = {
      ...state,
      query
    };
    expect(appReducer(state, changeQuery(query))).toEqual(expectedResult);
  });
});
