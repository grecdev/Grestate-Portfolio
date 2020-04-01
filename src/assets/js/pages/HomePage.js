import React from 'react';

import Showcase from '@components/pages/home/Showcase';
import HowItWorks from '@components/pages/home/HowItWorks';
import WeeklyDeals from '@components/pages/home/WeeklyDeals';
import Progress from '@components/pages/home/Progress';

const HomePage = () => {

	return (
		<>
			<Showcase />
			<HowItWorks />
			<WeeklyDeals />
			<Progress />
		</>
	)
}

export default HomePage;
