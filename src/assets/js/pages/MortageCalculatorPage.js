import React, { useState }from 'react';

import MortageShowcase from '@components/mortage_calculator/MortageShowcase';
import MortageInfo from '@components/mortage_calculator/MortageInfo';
import MortageChart from '@components/mortage_calculator/MortageChart';
import MortageCalculator from '@components/mortage_calculator/MortageCalculator';

import Row from 'react-bootstrap/Row';

const MortageCalculatorPage = () => {

	const [payment, setPayment] = useState({});

	const getTotalPayment = payment => setPayment(payment);

	return (
		<main id="mortage">

			<MortageShowcase />

			<section id='calculator' className='container-custom container-custom-md'>
				<Row className='m-0 py-2 justify-content-betwween align-items-stretch'>
					<MortageInfo payment={payment} />
					<MortageChart payment={payment}/>
					<MortageCalculator getTotalPayment={getTotalPayment} />
				</Row>
			</section>

		</main>
	)
}

export default MortageCalculatorPage;
