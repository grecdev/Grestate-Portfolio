import React from 'react';

import AboutShowcase from '@components/pages/about/AboutShowcase';
import WhoWeAre from '@components/pages/about/WhoWeAre';
import OurTeam from '@components/pages/about/OurTeam';
import Testimonial from '@components/pages/about/Testimonial';

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
