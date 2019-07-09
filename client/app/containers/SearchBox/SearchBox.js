import React from 'react';
import './style.scss';
import queryString from 'query-string';
import PropTypes from 'prop-types';

export default class SearchBox extends React.Component {// eslint-disable-line react/prefer-stateless-function
	componentDidMount() {
		// recibo el query de las propiedades
	    const { onQueryString, location } = this.props;
	    if (location !== undefined && location.search) {
		    // parseo los query strings
			const queryStrings = queryString.parse(location.search);

			// si viene un query string "search" y no es igual al que ya estaba...
		  	const { search } = queryStrings;
			if (search) {
		  		// Si no hay query en el store busco el producto
				onQueryString(search);
			}
	    }
	}

    render() {
	    const {
	      query, onChangeQuery, onSubmitForm
	    } = this.props;

    	return (
			<div className="btn-group-container">
				<form onSubmit={onSubmitForm}>
					<input
						type="text"
						name="query"
						className="search-input"
						placeholder="Nunca dejes de buscar"
		                value={query}
		                onChange={onChangeQuery}
					/>

				    <button
				      	title="Buscar productos en MercadoLibre"
				      	className="btn-group-addon search-btn"
						type="submit"
				    >
				    </button>
				</form>
			</div>
    	);
  	}
}


SearchBox.propTypes = {
  onQueryString: PropTypes.func,
  onChangeQuery: PropTypes.func,
  onSubmitForm: PropTypes.func,
  query: PropTypes.string,
  location: PropTypes.object
};
