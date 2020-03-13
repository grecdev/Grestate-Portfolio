import React from 'react';

import ContactLocation from './contact/ContactLocation';
import ContactInfo from './contact/ContactInfo';

const ContactPage = () => {
	return (
		<>
			<section id="contact">
				<ContactLocation />
				<ContactInfo />
			</section >
		</>
	)
}

export default ContactPage;
