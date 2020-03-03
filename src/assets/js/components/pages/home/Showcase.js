import React, { useContext } from 'react';

import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { GlobalContext } from '../../../context/GlobalContext';

const Showcase = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='home-showcase'>
			<Container fluid>
				<Row>
					<div className="home-showcase-text">
						<h1 className='mb-3'>Find the home that fits you</h1>
						<h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, molestias.</h6>
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
		</section>
	)
}

export default Showcase;
