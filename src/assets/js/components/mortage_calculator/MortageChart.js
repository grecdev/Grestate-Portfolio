import React, { useEffect }from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';

import Chartist from './chartist.min.js';

const MortageChart = ({payment}) => {
	
	let disabledChart = false;

	// So we can check if we don't have any values in the inputs
	const values = Object.values(payment).map(value => {

		if(isNaN(value) || value === 0) {

			value = 1;
			disabledChart = true;

		} else value;
		
		return value;
	});

	// Without the total payment which is displayed in the mortage info component
	values.pop();

	const data = {
		labels: [' ', ' ', ' '],
		series: values
	};

	const options = {
		width: 450,
		height: 330,
		donut: true,
		donutWidth: 40
	}

	useEffect(() => {

		new Chartist.Pie('.ct-chart', data, options);

	}, [payment]);

	return (

		<Col className='mortage-chart p-0 d-flex flex-column justify-content-center align-items-center position-relative'>
			<div className="ct-chart ct-perfect-fourth"></div>

			<p className="d-flex flex-column total-payment position-absolute font-weight-bold text-center">
				<span>${isNaN(payment.payment_per_month) ? 0 : payment.payment_per_month}</span><span>/month</span>
			</p>
		</Col>
		
	)
}

MortageChart.propTypes = {
	payment: PropTypes.object.isRequired
}

export default MortageChart;
