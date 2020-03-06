import React from 'react';

import Showcase from './Showcase';
import HowItWorks from './HowItWorks';
import WeeklyDeals from './WeeklyDeals';
import Progress from './Progress';

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
