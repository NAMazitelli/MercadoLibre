import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectQuery
} from 'containers/App/selectors';
import { loadProducts, changeQuery } from 'containers/App/actions';
import reducer from 'containers/App/reducer';
import saga from './saga';
import SearchBox from './SearchBox';

// Este objeto controla el cambio de query y el envio del formulario de busqueda
const mapDispatchToProps = (dispatch) => ({
  onChangeQuery: (evt) => dispatch(changeQuery(evt.target.value)),
  onQueryString: (query) => { dispatch(loadProducts(query)); },
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadProducts());
  }
});


const mapStateToProps = createStructuredSelector({
  query: makeSelectQuery()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default withRouter(compose(withReducer, withSaga, withConnect)(SearchBox));
export { mapDispatchToProps };
