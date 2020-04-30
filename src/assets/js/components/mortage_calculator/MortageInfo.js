import React from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import Col from 'react-bootstrap/Col';

const MortageInfo = ({payment}) => {

	let valuesArr = [];

	Object.entries(payment).forEach(item => valuesArr.push(item));

	return (
		<div className='payment-info d-flex align-items-center justify-content-center'>

			<div className='dots d-flex flex-column'>
				<div className="chart-color rounded-circle"></div>
				<div className="chart-color rounded-circle"></div>
				<div className="chart-color rounded-circle"></div>
			</div>

			<div className='d-flex flex-column'>
				{valuesArr.map((item, index) => {

					let number = item[1];

					if(isNaN(number)) number = 0;

					let capitalized = item[0].slice(0, 1).toUpperCase() + item[0].slice(1, item[0].length);
					let removedSpaces = capitalized.replace(/\_/g, ' ');
					let formatted_string = removedSpaces;
 
					if(index === 3) return;

					return (
						<div className="payment-info-box d-flex justify-content-between align-items-center my-1" key={uuidv4()}>
							<p className='payment-number m-0'>{formatted_string}: <span className='font-weight-bold'>${number}</span></p>
						</div>
					)

				})}
			</div>

		</div>
	)
}

MortageInfo.propTypes = {
	payment: PropTypes.object.isRequired
}


export default MortageInfo;
