import React from 'react';
import PropTypes from 'prop-types';

const RegexAlert = ({ text }) => <p className='alert alert-danger my-2 px-2 py-1 text-black'>{text}</p>

RegexAlert.propTypes = {
	text: PropTypes.string.isRequired
}

export default RegexAlert;