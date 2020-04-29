import React from 'react';

import Image from '@components/global_layout/Image';
import SectionHeader from '@components/global_layout/SectionHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Testimonial = () => {

	const testimonialDb = [
		{
			id: 1,
			feedback: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!',
			name: 'Elif Mathews',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!',
			avatar: 'avatar-1.jpg'
		},
		{
			id: 2,
			feedback: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!',
			name: 'Dru Wood',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!',
			avatar: 'avatar-2.jpg'
		},
		{
			id: 3,
			feedback: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!',
			name: 'Willem Lugo',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!',
			avatar: 'avatar-3.jpg'
		}
	];

	return (
		<section id='testimonial' className='py-5 px-3'>
			<SectionHeader title='What people say about us' description={true} />

			<Container fluid>
				<Row className='p-0 justify-content-between align-items-center'>
					{testimonialDb.map((user, index) => (
						<div
							key={user.id}
							className='testimonial-box p-4 rounded'
							data-index={index}
						>
							<div className="testimonial-box-review mb-4">
								<p>{user.feedback}</p>
							</div>

							<div className="testimonial-box-profile d-flex align-items-center">
								<Image src={user.avatar}/>

								<div className='d-flex flex-column ml-3'>
									<span className='font-weight-bold'>{user.name}</span>
									<span className='font-italic'>{user.description}</span>
								</div>
							</div>
						</div>
					))}
				</Row>
			</Container>
		</section>
	)
}

export default Testimonial;
