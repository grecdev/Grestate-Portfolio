import React from 'react';

import PropertyForm from '@components/global_layout/property_form/PropertyForm';

import Image from '@components/global_layout/Image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Showcase = () => {

	return (
		<section id='home-showcase'>
			<Container fluid>
				<Row className='justify-content-center align-items-stretch'>
					<div className="home-showcase-text d-flex flex-column justify-content-center">

						<div>
							<h1 className='mb-4'>Find the home that fits your needs</h1>
							<p className='font-italic font-weight-light text-muted'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos numquam dolorum itaque quis, soluta minima quos esse eaque sed aliquid quas quasi. Sint, consequatur quia?</p>
						</div>

						<PropertyForm buy={true} rent={true} multiple={true}/>

						<div className="showcase-cartoon">
							<Image src='showcase-cartoon.svg' />
						</div>
					</div>

					<div className="home-showcase-image">
						<Image src='home-showcase.jpg' />
					</div>
				</Row>
			</Container>
		</section >
	)
}

export default Showcase;
