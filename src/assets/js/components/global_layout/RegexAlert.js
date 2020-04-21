import React from 'react';
import PropTypes from 'prop-types';

const RegexAlert = ({ text, danger }) => <p className={`regex-alert text-${danger ? 'danger' : 'success'} my-2 p-0 bg-white text-center`} role='alert'>{text}</p>

RegexAlert.propTypes = {
	text: PropTypes.string.isRequired,
	danger: PropTypes.bool.isRequired
}

export default RegexAlert;