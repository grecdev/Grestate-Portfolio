import React from 'react';

import AboutShowcase from '@components/about/AboutShowcase';
import WhoWeAre from '@components/about/WhoWeAre';
import OurTeam from '@components/about/OurTeam';
import Testimonial from '@components/about/Testimonial';

const AboutPage = () => {

	return (
		<>
			<AboutShowcase />
			<WhoWeAre />
			<OurTeam />
			<Testimonial />
		</>
	)
}

export default AboutPage;
