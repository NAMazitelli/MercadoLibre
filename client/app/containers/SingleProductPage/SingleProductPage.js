/*
 * SingleProductPage
 *
 * Pagina interna de producto
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Product from 'components/Product';
import BreadCrumbs from 'components/BreadCrumbs';

export default class SingleProductPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * si el id viene seteado, buscar el producto
   */

  componentDidMount() {
    const { onChangeProduct, match } = this.props;
    if (typeof match === 'object' && match.params) {
      const { id } = match.params;
      if (id && id.trim().length > 0) {
        onChangeProduct(id);
      }
    }
  }

  render() {
    const {
      loading, error, product, category
    } = this.props;

    const productProps = {
      loading,
      error,
      product
    };


    return (
      <section>
        <Helmet>
          <title>MercadoLibre</title>
          <meta name="description" />
        </Helmet>
        <BreadCrumbs category={category} />
        <Product {...productProps} />
      </section>
    );
  }
}

SingleProductPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  product: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChangeProduct: PropTypes.func,
  match: PropTypes.object,
  category: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};
