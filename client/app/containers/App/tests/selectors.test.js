import {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectProductsList,
  makeSelectProduct,
  makeSelectQueryId,
  makeSelectQuery,
  makeSelectCategory
} from '../selectors';

describe('selectGlobal', () => {
  it('Deberia seleccionar el estado global', () => {
    const globalState = {};
    const mockedState = {
      global: globalState,
    };
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('Deberia deicr si la aplicacion esta cargando', () => {
    const loading = false;
    const mockedState = {
      global: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('Deberia decir si hay un error', () => {
    const error = 404;
    const mockedState = {
      global: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectProductsList', () => {
  const listSelector = makeSelectProductsList();
  it('Deberia seleccionar el listado de productos', () => {
    const products = [];
    const mockedState = {
      global: {
        productData: {
          list: products,
        },
      },
    };
    expect(listSelector(mockedState)).toEqual(products);
  });
});

describe('makeSelectProduct', () => {
  const singleProductSelector = makeSelectProduct();
  it('Deberia seleccionar la informacion de un producto', () => {
    const product = { };
    const mockedState = {
      global: {
        productData: {
          product
        }
      }
    };
    expect(singleProductSelector(mockedState)).toEqual(product);
  });
});

describe('makeSelectQuery', () => {
  const querySelector = makeSelectQuery();
  it('Deberia devolver el query actual', () => {
    const query = 'test';
    const mockedState = {
      global: {
        query
      }
    };
    expect(querySelector(mockedState)).toEqual(query);
  });
});

describe('makeSelectQueryId', () => {
  const queryIdSelector = makeSelectQueryId();
  it('Deberia devolver el query actual', () => {
    const queryId = 'test';
    const mockedState = {
      global: {
        queryId
      }
    };
    expect(queryIdSelector(mockedState)).toEqual(queryId);
  });
});

describe('makeSelectCategory', () => {
  const categorySelector = makeSelectCategory();
  it('Deberia devolver la categoria actual', () => {
    const category = 'test';
    const mockedState = {
      global: {
        category
      }
    };
    expect(categorySelector(mockedState)).toEqual(category);
  });
});
