import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const makeSelectProductsList = () => createSelector(
  selectGlobal,
  (globalState) => globalState.productData.list
);

const makeSelectProduct = () => createSelector(
  selectGlobal,
  (globalState) => globalState.productData.product
);

const makeSelectQueryId = () => createSelector(
  selectGlobal,
  (globalState) => globalState.queryId
);

const makeSelectQuery = () => createSelector(
  selectGlobal,
  (globalState) => globalState.query
);

const makeSelectCategory = () => createSelector(
  selectGlobal,
  (globalState) => globalState.category
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectProductsList,
  makeSelectProduct,
  makeSelectQueryId,
  makeSelectQuery,
  makeSelectCategory
};
