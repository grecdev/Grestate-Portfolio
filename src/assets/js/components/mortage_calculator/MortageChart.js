import React, { useEffect }from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';

import Chartist from './chartist.min.js';

const MortageChart = ({ payment }) => {
	
	let disabledChart = false;

	// So we can check if we don't have any values in the inputs
	const values = Object.values(payment).map(value => {

		if(isNaN(value) || value === 0) {

			value = 1;
			disabledChart = true;
		};
		
		return value;
	});

	// Without the total payment which is displayed in the middle of the chart
	values.pop();

	const data = {
		labels: [' ', ' ', ' '],
		series: values
	};

	const options = {
		donut: true,
		donutWidth: 40
	}

	useEffect(() => {

		new Chartist.Pie('.ct-chart', data, options);

	}, [payment]);

	return (

		<div className='mortage-chart p-0'>
			<div className="ct-chart ct-perfect-fourth position-relative">
				<p className="total-payment d-flex flex-column justify-content-center align-items-center position-absolute font-weight-bold">
					<span>${isNaN(payment.payment_per_month) ? 0 : payment.payment_per_month}</span><span>/month</span>
				</p>
			</div>

		</div>
		
	)
}

MortageChart.propTypes = {
	payment: PropTypes.object.isRequired
}

export default MortageChart;
