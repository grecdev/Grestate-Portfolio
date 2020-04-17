import React from 'react';

import SectionHeader from '@components/global_layout/SectionHeader';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ContactInfo = () => {

	const toggleModal = e => {

		const modal = document.getElementById('contact-form-modal');

		if (e.target.id === 'contact-form-modal' || e.target.id === 'close-form-modal' || e.target.parentElement.id === 'close-form-modal') modal.classList.replace('d-flex', 'd-none');

		if (e.currentTarget.id === 'contact-form') modal.classList.replace('d-none', 'd-flex');

		e.stopPropagation();
	}

	return (
		<div id='contact-info'>

			<SectionHeader title='Contact us' description={false} />

			<div className="contact-info-details mb-5">
				<p className='text-muted font-italic font-weight-light'><i className="far fa-compass"></i> 1600 Amphitheatre Pkwy, Mountain View, CA 94043, United States</p>
				<p className='text-muted font-italic font-weight-light'><i className="fas fa-mobile-alt"></i> +123-456-789</p>
				<p className='text-muted font-italic font-weight-light'><i className="far fa-envelope"></i> grecdev1@gmail.com</p>
			</div>

			<button type='button' id='contact-form' className='py-2 rounded' onClick={toggleModal}>Message us</button>

			<div id="contact-form-modal" className="position-fixed d-none flex-column justify-content-center align-items-center" onClick={toggleModal}>

				<Form name='contact-form' className='p-4 position-relative d-flex flex-column border-0 bg-white'>
					<button id='close-form-modal' type='button' role='close modal' className='mb-3'><i className="fas fa-times"></i></button>

					<Form.Row>
						<Form.Group as={Col} controlId="full-name">
							<Form.Label>Full Name</Form.Label>
							<Form.Control type="email" placeholder="Enter your name" />
						</Form.Group>
						<Form.Group as={Col} controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>
					</Form.Row>

					<Form.Group controlId="address">
						<Form.Label>Address</Form.Label>
						<Form.Control placeholder="Enter your address" />
					</Form.Group>

					<Form.Group controlId="message">
						<Form.Label>Your message</Form.Label>
						<Form.Control as="textarea" rows="3" />
					</Form.Group>

					<Button variant="primary" type="submit" className='shadow-none'>
						Send a message
					</Button>
				</Form>
			</div>
		</div >
	)
}

export default ContactInfo;
