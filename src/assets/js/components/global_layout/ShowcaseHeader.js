import React from 'react';
import PropTypes from 'prop-types';

const ShowcaseHeader = ({ text }) => {
	return (
		<div className='showcase-header px-4 py-2 rounded'>
			<h1>{text}</h1>
		</div>
	)
}

ShowcaseHeader.propTypes = {
	text: PropTypes.string.isRequired
}

export default ShowcaseHeader;
