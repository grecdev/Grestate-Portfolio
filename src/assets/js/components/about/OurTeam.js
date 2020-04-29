import React from 'react';

import SectionHeader from '@components/global_layout/SectionHeader';
import Image from '@components/global_layout/Image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OurTeam = () => {

	return (
		<section id='our-team'>
			<Container>
				<SectionHeader title='Meet Our Team' description={false} />

				<Row className='justify-content-around align-items-end py-3'>
					<Col className='text-center col-lg-3 p-0'>
						<div className="avatar mb-4 rounded shadow mx-auto">
							<Image src='avatar-6.jpg' />
						</div>

						<h4>Tasmin Coombes</h4>
						<p className='text-black-50 font-weight-light font-italic'>CTO</p>
						<p className='px-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, sint.</p>
					</Col>

					<Col className='text-center col-lg-3 p-0'>
						<div className="avatar mb-4 rounded shadow mx-auto">
							<Image src='avatar-7.jpg' />
						</div>

						<h4>Ayrton Cottrell</h4>
						<p className='text-black-50 font-weight-light font-italic'>CEO</p>
						<p className='px-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, sint.</p>
					</Col>

					<Col className='text-center col-lg-3 p-0'>
						<div className="avatar mb-4 rounded shadow mx-auto">
							<Image src='avatar-8.jpg' />
						</div>

						<h4>Aaliya Archer</h4>
						<p className='text-black-50 font-weight-light font-italic'>HR</p>
						<p className='px-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, sint.</p>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default OurTeam;
