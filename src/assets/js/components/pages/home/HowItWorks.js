import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/GlobalContext';

import SectionHeader from '../../global_layout/SectionHeader';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HowItWorks = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='how-it-works'>
			<Container className='p-3 mt-5'>
				<SectionHeader title='How It Works' />

				<Row className='align-items-center mt-5'>
					<Col className='text-center'>
						<img className='mx-auto' src={getImage('home-icon.svg')} alt='home icon' />

						<p className="font-italic">Find your home</p>
					</Col>

					<div className="arrow d-flex justify-content-end align-items-center"><i className="fas fa-angle-right"></i></div>

					<Col className='text-center'>
						<img className='mx-auto' src={getImage('payment-icon.svg')} alt='home icon' />

						<p className="font-italic">Pay your home</p>
					</Col>

					<div className="arrow d-flex justify-content-end align-items-center"><i className="fas fa-angle-right"></i></div>

					<Col className='text-center'>
						<img className='mx-auto' src={getImage('move-icon.svg')} alt='home icon' />

						<p className="font-italic">Move in your home</p>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default HowItWorks;
