/*
 * HomePage
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ResultsList from 'components/ResultsList';
import BreadCrumbs from 'components/BreadCrumbs';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      loading, error, products, category
    } = this.props;

    const productsListProps = {
      loading,
      error,
      products
    };

    return (
      <section>
        <Helmet>
          <title>MercadoLibre</title>
          <meta name="description" content="MercadoLibre" />
        </Helmet>
        <BreadCrumbs category={category} />
        <ResultsList {...productsListProps} />
      </section>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  products: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  category: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};
