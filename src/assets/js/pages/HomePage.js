import React from 'react';

import Showcase from '@components/home/Showcase';
import HowItWorks from '@components/home/HowItWorks';
import WeeklyDeals from '@components/home/WeeklyDeals';
import Progress from '@components/home/Progress';

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
