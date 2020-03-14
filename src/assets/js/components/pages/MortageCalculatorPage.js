import React from 'react';

import MortageShowcase from './mortage_calculator/MortageShowcase';
import MortageCalculator from './mortage_calculator/MortageCalculator';

const MortageCalculatorPage = () => {

	return (
		<main id="mortage">

			<MortageShowcase />
			<MortageCalculator />


		</main>
	)
}

export default MortageCalculatorPage;
