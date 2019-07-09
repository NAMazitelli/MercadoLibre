import React from 'react';
import PropTypes from 'prop-types';
import ErrorScreen from 'components/ErrorScreen';
import List from 'components/List';
import ProductDescription from 'components/ProductDescription';
import LoadingIndicator from 'components/LoadingIndicator';

const Product = ({ loading, error, product }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    return <ErrorScreen error={error} />;
  }

  if (product !== undefined && product !== false) {
    return <ProductDescription item={product.item} />;
  }

  return null;
};

Product.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  product: PropTypes.any
};

export default Product;
