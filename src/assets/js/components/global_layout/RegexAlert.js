import React from 'react';
import PropTypes from 'prop-types';

const RegexAlert = ({text}) => <p className='alert alert-danger p-2 text-white'>{text}</p>

RegexAlert.propTypes = {
	text: PropTypes.string.isRequired
}

export default RegexAlert;