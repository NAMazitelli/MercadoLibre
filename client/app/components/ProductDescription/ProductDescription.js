import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import FreeShippingBadge from 'components/FreeShippingBadge';

const ProductDescription = ({ item }) => (
		<section key={item.id} className="product-detail">
			<div className="flexbox mobile-column fullwidth">
				<div className="product-detail__left">
					<div
						style={
							{ backgroundImage: `url(${item.picture}` }
						}
						className="product-detail__img"
					>
					</div>
					<div className="product-detail__description">
						<h3>Descripción del producto</h3>
						<p>{ item.description }</p>
					</div>
				</div>
				<div className="product-detail__title">
					<span className="product-detail__subtitle">
						{item.condition} - {item.sold_quantity} vendidos
					</span>
					<h2>{ item.title }</h2>
					<h4 className="product-detail__price">
						$ { item.price.amount }
						<span className="product-detail__decimal">
						{ ''.padStart(item.price.decimals, '0') }
						</span>
						{ item.free_shipping && <FreeShippingBadge /> }
					</h4>
					<a className="button is-link  is-fullwidth">Comprar</a>
				</div>
			</div>
		</section>
);

ProductDescription.propTypes = {
  item: PropTypes.any
};

export default ProductDescription;
