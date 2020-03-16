import React, { useState }from 'react';

import MortageShowcase from './mortage_calculator/MortageShowcase';
import MortageChart from './mortage_calculator/MortageChart';
import MortageCalculator from './mortage_calculator/MortageCalculator';

import Row from 'react-bootstrap/Row';

const MortageCalculatorPage = () => {

	const [payment, setPayment] = useState({});

	const getTotalPayment = payment => setPayment(payment);

	console.log(payment);

	return (
		<main id="mortage">

			<MortageShowcase />

			<div className="container-custom container-custom-sm">
				<Row>
					<MortageChart payment={payment}/>
					<MortageCalculator getTotalPayment={getTotalPayment} />
				</Row>
			</div>

		</main>
	)
}

export default MortageCalculatorPage;
