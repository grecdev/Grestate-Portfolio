import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ title, description }) => {
	return (
		<div className='section-header text-center mb-5'>
			<h4 className='text-capitalize'>{title}</h4>

			<hr />

			{description && <p className='font-weight-light px-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere quidem laudantium at animi sapiente, alias libero temporibus quaerat assumenda sunt.</p>}
		</div>
	)
}

SectionHeader.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.bool.isRequired
}

export default SectionHeader;
