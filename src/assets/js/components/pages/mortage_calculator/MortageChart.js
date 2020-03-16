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
					labels: ['Red', 'Blue', 'Yellow'],
					datasets: [{
						label: '# of Votes',
						data: [12, 19, 3],
						backgroundColor: [
								'red',
								'green',
								'blue'
						],
						borderColor: [
								'#fff'
						],
						borderWidth: 2
				}]
			}
		});

	}, []);

	return (

		<Col className='mortage-chart d-flex flex-column justify-content-center align-items-center'>
			<canvas id='chart' width="150" height="150" aria-label="Hello ARIA World" role="img">
				<p>Loading...</p>
			</canvas>
		</Col>
		
	)
}

MortageChart.propTypes = {
	payment: PropTypes.object.isRequired
}

export default MortageChart;
