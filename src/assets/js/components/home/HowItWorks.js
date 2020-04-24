import React from 'react';

import SectionHeader from '@components/global_layout/SectionHeader';
import Image from '@components/global_layout/Image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HowItWorks = () => {
	
	return (
		<section id='how-it-works'>
			<Container className='p-3 mt-5'>
				<SectionHeader title='How It Works' description={false} />

				<Row className='align-items-center mt-5'>
					<Col className='text-center'>
						<div className='mx-auto mb-2'>
							<Image src='home-icon.svg' />
						</div>

						<p className="font-italic">Find your home</p>
					</Col>

					<div className="arrow d-flex justify-content-end align-items-center"><i className="fas fa-angle-right"></i></div>

					<Col className='text-center'>
						<div className='mx-auto mb-2'>
							<Image src='payment-icon.svg' />
						</div>

						<p className="font-italic">Pay your home</p>
					</Col>

					<div className="arrow d-flex justify-content-end align-items-center"><i className="fas fa-angle-right"></i></div>

					<Col className='text-center'>
						<div className='mx-auto mb-2'>
							<Image src='move-icon.svg' />
						</div>
						
						<p className="font-italic">Move in your home</p>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default HowItWorks;
