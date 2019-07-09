import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectProductsList,
  makeSelectLoading,
  makeSelectError,
  makeSelectQuery,
  makeSelectCategory
} from 'containers/App/selectors';
import HomePage from './HomePage';

export default withRouter(
  connect(
    createStructuredSelector({
      error: makeSelectError(),
      loading: makeSelectLoading(),
      products: makeSelectProductsList(),
      query: makeSelectQuery(),
      category: makeSelectCategory()
    })
  )(HomePage)
);
