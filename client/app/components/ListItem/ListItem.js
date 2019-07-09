import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FreeShippingBadge from 'components/FreeShippingBadge';
import './style.scss';

const ListItem = ({ item }) => (
	<Link to={`/item/${item.id}`}>
		<article key={item.id} className="product">
			<div
			  style={
				  	{ backgroundImage: `url(${item.picture}` }
				}
			  className="product__img"
			>
			</div>
			<div className="flexbox fullwidth">
				<div className="product__description">
					<h5>$ { item.price.amount }
						{	item.free_shipping && <FreeShippingBadge /> }
					</h5>
					<p>{ item.title }</p>
				</div>
				<span className="product__place">{ item.address }</span>
			</div>
		</article>
	</Link>
);

ListItem.propTypes = {
  item: PropTypes.any
};

export default ListItem;
