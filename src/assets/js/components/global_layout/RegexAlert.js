import React from 'react';
import PropTypes from 'prop-types';

const RegexAlert = ({ text, danger }) => <p className={`alert alert-${danger ? 'danger' : 'success'} my-2 px-2 py-1 text-black`} role='alert'>{text}</p>

RegexAlert.propTypes = {
	text: PropTypes.string.isRequired,
	danger: PropTypes.bool.isRequired
}

export default RegexAlert;