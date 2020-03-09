import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/GlobalContext';

import SectionHeader from '../../global_layout/SectionHeader';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Testimonial = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='testimonial' className='py-5'>
			<SectionHeader title='What people say about us' description={true} />

			<Container fluid>
				<Row className='px-3 position-relative'>

					<div className='testimonial-box p-4 border rounded col-lg-4 shadow-lg' >
						<div className="testimonial-box-review mb-4">
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!</p>
						</div>

						<div className="testimonial-box-profile d-flex align-items-center">
							<img src={getImage('testimonial-avatar-1.jpeg')} alt='avatar' className='mr-3' />

							<div className='d-flex flex-column'>
								<span className='font-weight-bold'>Elif Mathews</span>
								<span className='font-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!</span>
							</div>
						</div>
					</div>

					<div className='testimonial-box p-4 border rounded col-lg-4 shadow-lg'>
						<div className="testimonial-box-review mb-4">
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!</p>
						</div>

						<div className="testimonial-box-profile d-flex align-items-center">
							<img src={getImage('testimonial-avatar-2.jpeg')} alt='avatar' className='mr-3' />

							<div className='d-flex flex-column'>
								<span className='font-weight-bold'>Dru Wood</span>
								<span className='font-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!</span>
							</div>
						</div>
					</div>

					<div className='testimonial-box p-4 border rounded col-lg-4 shadow-lg'>
						<div className="testimonial-box-review mb-4">
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!</p>
						</div>

						<div className="testimonial-box-profile d-flex align-items-center">
							<img src={getImage('testimonial-avatar-3.jpeg')} alt='avatar' className='mr-3' />

							<div className='d-flex flex-column'>
								<span className='font-weight-bold'>Willem Lugo</span>
								<span className='font-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!</span>
							</div>
						</div>
					</div>

					<div className='testimonial-box p-4 border rounded col-lg-4 shadow-lg'>
						<div className="testimonial-box-review mb-4">
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!</p>
						</div>

						<div className="testimonial-box-profile d-flex align-items-center">
							<img src={getImage('testimonial-avatar-4.jpeg')} alt='avatar' className='mr-3' />

							<div className='d-flex flex-column'>
								<span className='font-weight-bold'>Borys Redmond</span>
								<span className='font-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!</span>
							</div>
						</div>
					</div>

					<div className='testimonial-box p-4 border rounded col-lg-4 shadow-lg'>
						<div className="testimonial-box-review mb-4">
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!</p>
						</div>

						<div className="testimonial-box-profile d-flex align-items-center">
							<img src={getImage('testimonial-avatar-5.jpeg')} alt='avatar' className='mr-3' />

							<div className='d-flex flex-column'>
								<span className='font-weight-bold'>Tashan Barr</span>
								<span className='font-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!</span>
							</div>
						</div>
					</div>

				</Row>
			</Container>
		</section>
	)
}

export default Testimonial;
