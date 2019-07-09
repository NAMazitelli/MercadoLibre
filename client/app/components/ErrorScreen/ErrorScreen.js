import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ErrorScreen = ({ error }) => ( // eslint-disable-line react/prefer-stateless-function
	<div className="ErrorWrapper">
		<div className="ErrorWrapper__image">
		</div>
		<h2>{error}</h2>
	</div>
);

ErrorScreen.propTypes = {
  error: PropTypes.string
};

export default ErrorScreen;
