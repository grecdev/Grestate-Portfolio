import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ title }) => {
	return (
		<div className='section-header text-center mb-5'>
			<h4>{title}</h4>

			<hr />
		</div>
	)
}

SectionHeader.propTypes = {
	title: PropTypes.string.isRequired
}

export default SectionHeader;
