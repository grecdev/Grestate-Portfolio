import React, { useContext } from 'react';

import { GlobalContext } from '@context/GlobalContext';

import SectionHeader from '@components/global_layout/SectionHeader';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WeeklyDeals = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='weekly-deals'>
			<Container className='py-5'>
				<SectionHeader title='Weekly Deals' description={false} />

				<Row>
					<Col className='p-1 col-lg-7 position-relative d-flex flex-column justify-content-center align-items-center'>
						<div className='overlay-image overlay-image-2'>
							<picture>
								<source srcSet={getImage('property-sanfrancisco-9.jpg')} type='image/jpg' />
								{/* <source srcSet={getImage('property-sanfrancisco-9.webp')} type='image/webp' /> */}

								<img src={getImage('property-sanfrancisco-9.jpg')} alt='San Francisco' />
							</picture>
						</div>

						<div className="position-absolute text-center">
							<h5>San Francisco</h5>
							<p>131 properties</p>
						</div>
					</Col>

					<Col className='p-1 col-lg-5 position-relative d-flex flex-column justify-content-center align-items-center'>

						<div className='overlay-image overlay-image-2'>
							<picture>
								<source srcSet={getImage('property-newyork-1.jpg')} type='image/jpg' />
								{/* <source srcSet={getImage('property-newyork-1.jpg')} type='image/webp' /> */}

								<img src={getImage('property-newyork-1.jpg')} alt='New York' />
							</picture>
						</div>

						<div className="position-absolute text-center">
							<h5>New York</h5>
							<p>523 properties</p>
						</div>
					</Col>
				</Row>

				<Row>
					<Col className='p-1 col-lg-5 position-relative d-flex flex-column justify-content-center align-items-center'>
						<div className='overlay-image overlay-image-2'>
							<picture>
								<source srcSet={getImage('property-boston-12.jpg')} type='image/jpg' />
								{/* <source srcSet={getImage('property-boston-12.webp')} type='image/webp' /> */}

								<img src={getImage('property-boston-12.jpg')} alt='San Francisco' />
							</picture>
						</div>

						<div className="position-absolute text-center">
							<h5>Boston</h5>
							<p>220 properties</p>
						</div>
					</Col>

					<Col className='p-1 col-lg-7 position-relative d-flex flex-column justify-content-center align-items-center'>

						<div className='overlay-image overlay-image-2'>
							<picture>
								<source srcSet={getImage('property-losangeles-7.jpg')} type='image/jpg' />
								{/* <source srcSet={getImage('property-losangeles-7.webp')} type='image/webp' /> */}

								<img src={getImage('property-losangeles-7.jpg')} alt='New York' />
							</picture>

						</div>

						<div className="position-absolute text-center">
							<h5>Los Angeles</h5>
							<p>324 properties</p>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default WeeklyDeals;