
import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import ErrorScreen from 'components/ErrorScreen';
import LoadingIndicator from 'components/LoadingIndicator';

const ResultsList = ({ loading, error, products }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    let errormsg = 'Ocurrio un error durante la busqueda';
    if (typeof error === 'string') {
      errormsg = error;
    }
    return <ErrorScreen error={errormsg} />;
  }

  if (products !== undefined && products !== false && products.items) {
    return <List items={products.items} component={ListItem} />;
  }

  return null;
};

ResultsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  products: PropTypes.any
};

export default ResultsList;
