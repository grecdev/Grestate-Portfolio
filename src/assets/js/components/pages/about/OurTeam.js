import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/GlobalContext';

import SectionHeader from '../../global_layout/SectionHeader';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OurTeam = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='our-team'>
			<Container>
				<SectionHeader title='Meet Our Team' description={false} />

				<Row className='justify-content-around align-items-end py-3'>
					<Col className='text-center col-lg-3 p-0 small-card'>
						<div className="avatar mb-4">
							<picture>
								<source srcSet={getImage('billgates-avatar.jpg')} type='image/jpg' />
								{/* <source srcSet={getImage('billgates-avatar.webp')} type='image/webp'/> */}
								<img src={getImage('billgates-avatar.jpg')} alt='avatar' className='rounded shadow' />
							</picture>
						</div>

						<h4>Bill Gates</h4>
						<p className='text-black-50 font-weight-light font-italic'>CTO</p>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, sint.</p>
					</Col>

					<Col className='text-center col-lg-3 p-0'>
						<div className="avatar mb-4">
							<picture>
								<source srcSet={getImage('grecdev-avatar.jpeg')} type='image/jpeg' />
								{/* <source srcSet={getImage('grecdev-avatar.webp')} type='image/webp'/> */}

								<img src={getImage('grecdev-avatar.jpeg')} alt='avatar' className='rounded shadow' />
							</picture>
						</div>

						<h4>Grecdev</h4>
						<p className='text-black-50 font-weight-light font-italic'>CEO</p>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, sint.</p>
					</Col>

					<Col className='text-center col-lg-3 p-0 small-card'>
						<div className="avatar mb-4">
							<picture>
								<source srcSet={getImage('jeffbezos-avatar.jpg')} type='image/jpeg' />
								{/* <source srcSet={getImage('jeffbezos-avatar.webp')} type='image/webp'/> */}

								<img src={getImage('jeffbezos-avatar.jpg')} alt='avatar' className='rounded shadow' />
							</picture>
						</div>

						<h4>Jeff Bezos</h4>
						<p className='text-black-50 font-weight-light font-italic'>HR</p>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, sint.</p>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default OurTeam;
