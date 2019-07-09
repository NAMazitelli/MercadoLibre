import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
  LOAD_SINGLE_PRODUCT,
  LOAD_SINGLE_PRODUCT_SUCCESS,
  LOAD_SINGLE_PRODUCT_ERROR,
  CHANGE_QUERY
} from './constants';

// El estado inicial
export const initialState = {
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

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      if (action.query !== undefined) {
        return {
          ...state,
          loading: true,
          error: false,
          productData: {
            list: false,
            product: false,
          },
          query: action.query,
        };
      }
      return {
        ...state,
        loading: true,
        error: false,
        productData: {
          list: false,
          product: false,
        }
      };
    }

    case LOAD_PRODUCTS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        productData: {
          list: action.products,
          product: false,
        },
        category: action.products.categories
      };
      return newState;
    }

    case LOAD_PRODUCTS_ERROR: {
      return { ...state, error: action.error, loading: false };
    }

    case LOAD_SINGLE_PRODUCT: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        productData: {
          list: false,
          product: false
        },
        queryId: action.queryId
      };

      return newState;
    }

    case LOAD_SINGLE_PRODUCT_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        productData: {
          list: false,
          product: action.product,
        },
        category: action.product.item.categories
      };

      return newState;
    }

    case LOAD_SINGLE_PRODUCT_ERROR: {
      return { ...state, error: action.error, loading: false };
    }

    case CHANGE_QUERY:
        return { ...state, query: action.query };


    default:
      return state;
  }
}

export default appReducer;
