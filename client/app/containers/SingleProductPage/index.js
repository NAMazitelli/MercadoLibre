import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectProduct,
  makeSelectCategory
} from 'containers/App/selectors';
import { loadSingleProduct } from '../App/actions';
import saga from './saga';
import SingleProductPage from './SingleProductPage';

const mapDispatchToProps = (dispatch) => ({
  onChangeProduct: (id) => {
    dispatch(loadSingleProduct(id));
  }
});

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectLoading(),
  product: makeSelectProduct(),
  category: makeSelectCategory()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'single', saga });

export default withRouter(compose(withSaga, withConnect)(SingleProductPage));
export { mapDispatchToProps };
