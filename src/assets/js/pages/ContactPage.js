import React from 'react';

import ContactLocation from '@components/pages/contact/ContactLocation';
import ContactInfo from '@components/pages/contact/ContactInfo';

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
