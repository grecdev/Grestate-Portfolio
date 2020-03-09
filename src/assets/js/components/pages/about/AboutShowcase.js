import React from 'react';

import ShowcaseHeader from '../../global_layout/ShowcaseHeader';

import Container from 'react-bootstrap/Container';

const AboutShowcase = () => {

	return (
		<section id='about-showcase'>
			<Container fluid className='p-0 overlay-image overlay-image-2 d-flex justify-content-center align-items-center'>

				<ShowcaseHeader text='About Us' />

			</Container>
		</section>
	)
}

export default AboutShowcase;
