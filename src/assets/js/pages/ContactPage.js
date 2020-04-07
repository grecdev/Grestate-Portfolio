import React from 'react';

import ContactLocation from '@components/contact/ContactLocation';
import ContactInfo from '@components/contact/ContactInfo';

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
