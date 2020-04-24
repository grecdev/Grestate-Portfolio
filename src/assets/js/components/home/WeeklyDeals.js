import React from 'react';

import SectionHeader from '@components/global_layout/SectionHeader';
import Image from '@components/global_layout/Image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WeeklyDeals = () => {

	return (
		<section id='weekly-deals'>
			<Container className='py-5'>
				<SectionHeader title='Weekly Deals' description={false} />

				<Row>
					<Col className='p-1 col-lg-7 position-relative d-flex flex-column justify-content-center align-items-center'>
						<div className='overlay-image overlay-image-2'>
							<Image src='property-sanfrancisco-9.jpg' />
						</div>

						<div className="position-absolute text-center">
							<h5>San Francisco</h5>
							<p>131 properties</p>
						</div>
					</Col>

					<Col className='p-1 col-lg-5 position-relative d-flex flex-column justify-content-center align-items-center'>

						<div className='overlay-image overlay-image-2'>
							<Image src='property-newyork-1.jpg' />
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
							<Image src='property-boston-12.jpg' />
						</div>

						<div className="position-absolute text-center">
							<h5>Boston</h5>
							<p>220 properties</p>
						</div>
					</Col>

					<Col className='p-1 col-lg-7 position-relative d-flex flex-column justify-content-center align-items-center'>

						<div className='overlay-image overlay-image-2'>
							<Image src='property-losangeles-7.jpg' />
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
