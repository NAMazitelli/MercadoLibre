import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class BreadCrumbs extends React.Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		const {
			category
		} = this.props;
		let breadCrumbs = '';
		if (category !== undefined && category.length > 0) {
			breadCrumbs = category.map((cat, index) => {
				if (index < category.length - 1) {
					return ` ${breadCrumbs} ${cat} >`;
				}
				return <Fragment key={`${index}`}>{breadCrumbs}<b>{cat}</b></Fragment>;// eslint-disable-line react/no-array-index-key
			});
		}

	    return (
	      <div className="breadcrumbs">
	        <span>{ breadCrumbs }</span>
	      </div>
	    );
	}
}
BreadCrumbs.propTypes = {
  category: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

export default BreadCrumbs;
