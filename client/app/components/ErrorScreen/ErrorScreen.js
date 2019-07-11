import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ErrorScreen = ({ error }) => ( // eslint-disable-line react/prefer-stateless-function
	<div className="ErrorWrapper">
		<div className="ErrorWrapper__image">
			<div className="lds-bg">
	            <div></div>
	            <div></div>
	            <div></div>
	            <div></div>
			</div>
		</div>
		<h2>{error}</h2>
	</div>
);

ErrorScreen.propTypes = {
  error: PropTypes.any
};

export default ErrorScreen;
