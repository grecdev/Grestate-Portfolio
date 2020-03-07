import React, { useContext } from 'react';

import PropertyForm from '../../global_layout/PropertyForm';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { GlobalContext } from '../../../context/GlobalContext';

const Showcase = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='home-showcase'>
			<Container fluid>
				<Row className='justify-content-center align-items-stretch'>
					<div className="home-showcase-text d-flex flex-column justify-content-center">

						<div>
							<h1 className='mb-4'>Find the home that fits your needs</h1>
							<p className='font-italic font-weight-light text-muted'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos numquam dolorum itaque quis, soluta minima quos esse eaque sed aliquid quas quasi. Sint, consequatur quia?</p>
						</div>

						<PropertyForm />

						<div className="showcase-cartoon">
							<img src={getImage('showcase-cartoon.svg')} alt='showcase cartoon' />
						</div>
					</div>

					<div className="home-showcase-image">
						<picture>
							<source srcSet={getImage('home-showcase.webp')} type='image/webp' />
							<source srcSet={getImage('home-showcase.jpg')} type='image/jpg' />

							<img src={getImage('home-showcase.webp')} alt='home showcase' />
						</picture>
					</div>
				</Row>
			</Container>
		</section >
	)
}

export default Showcase;
