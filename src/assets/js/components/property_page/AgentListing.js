import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AgentListing = ({ agent }) => {
	
	// If we use a img element the quality of image is bad
	const bg_image = {
		background: `url(${require(`../../../media/${agent.avatar}`)}) no-repeat center/cover`
	}

	const showNumber = e => {

		setNumberVisible(true);

		e.stopPropagation();
	}

	const [number_visible, setNumberVisible] = useState(false);

	// So we can show / hide the number
	useEffect(() => {

		const number = agent.number.replace(/\./g, ' ');

		if(!number_visible) {

			// Get the last 6 numbers and replace them with asterisk
			let formatted = number.substring(number.indexOf(' ') + 1).replace(/\d/g, '*');
	
			// Get the first 3 numbers and combine them with the asterisk
			formatted = number.substring(0, number.indexOf(' ') + 1) + formatted;
	
			document.querySelector('.number p:first-child').textContent = formatted;

		} else document.querySelector('.number p:first-child').textContent = number;

	}, [number_visible]);

	return (
		<section id='agent-listing'>

			<div className='w-100 text-center d-flex flex-column justify-content-start align-items-center border rounded'>
				<div className="agent-card-header py-4">

					<div style={bg_image} className='rounded-circle mb-2 mx-auto'></div>
					
					<h3 className='m-0'>{agent.name}</h3>

				</div>

				<div className="agent-card-info mb-3 py-4 text-white text-center rounded">

					
					<div className="number d-flex flex-row justify-content-center align-items-center mb-3">
						<p className='m-0'></p>
						<p className='m-0 ml-3' onClick={showNumber}>Show number</p>
					</div>

					<p className='mb-0'>{agent.email}</p>

				</div>
			</div>
			

			<div className="agent-card-footer py-4 px-5 d-flex flex-column justify-content-center align-items-stretch rounded-bottom">

				<button type='button' className='mb-2 p-2 border-0 outline-none'>Contact Agent</button>
				<button type='button' className='p-2 outline-none'>Find other Agent</button>

			</div>

		</section>
	)
}

AgentListing.propTypes = {
	agent: PropTypes.object.isRequired
}

export default AgentListing;
