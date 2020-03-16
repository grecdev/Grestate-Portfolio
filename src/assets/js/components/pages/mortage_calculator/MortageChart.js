import React, {useEffect}from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';

import Chart from 'chart.js';

const MortageChart = ({payment}) => {

	useEffect(() => {

		const ctx = document.getElementById('chart');

		const chart = new Chart(ctx, {
			type: 'pie',
			data: {
					labels: ['Principal & interest', 'Taxes', 'Insurance'],
					datasets: [{
						data: [payment.totalPayment, payment.taxes, payment.insurance],
						backgroundColor: [
								'#6f42c1',
								'#dc3545',
								'#ffc107'
						],
						borderColor: '#fff',
						borderWidth: 5
				}]
			}
		});

	}, [payment]);

	return (

		<Col className='mortage-chart d-flex flex-column justify-content-center align-items-center'>
			<canvas id='chart' width='550' height='300' aria-label="Hello ARIA World" role="img">
				<p>Loading...</p>
			</canvas>
		</Col>
		
	)
}

MortageChart.propTypes = {
	payment: PropTypes.object.isRequired
}

export default MortageChart;
