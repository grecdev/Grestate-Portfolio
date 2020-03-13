import React from 'react';

import Showcase from './home/Showcase';
import HowItWorks from './home/HowItWorks';
import WeeklyDeals from './home/WeeklyDeals';
import Progress from './home/Progress';

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
