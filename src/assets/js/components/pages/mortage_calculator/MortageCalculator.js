import React, { useState, useContext, useEffect } from 'react';

import { GlobalContext } from '../../../context/GlobalContext';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MortageCalculator = () => {

	const { disableLetters } = useContext(GlobalContext);

	const initialLoanState = {
		home_price: 1000000,
		down_payment: 0,
		down_payment_percent: 0,
		loan_program: 0,
		interest_rate: 0,
		total_payment: 0
	}

	const [loanState, setLoanState] = useState(initialLoanState);

	const calculateLoan = e => {

		let value, percent;

		e.target.value.length === 0 ? value = 0 : value = parseFloat(e.target.value);
		
		if (e.target.id === 'home-price') {

			percent = loanState.down_payment * 100 / value;
			setLoanState(prevState => ({ ...prevState, home_price: value}));

			if(loanState.down_payment > 0) setLoanState(prevState => ({ ...prevState, down_payment_percent: percent }));
		}

		if(e.target.id === 'down-payment') {

			percent = value * 100 / loanState.home_price;
			setLoanState(prevState => ({ ...prevState, down_payment: value}));

			if(loanState.home_price > 0) setLoanState(prevState => ({ ...prevState, down_payment_percent: percent }));
		}

		if(e.target.id === 'down-payment-percent') {

			if(value <= 100) {

				percent = (loanState.home_price / 100) * value;

				console.log(percent);

				setLoanState(prevState => ({ ...prevState, down_payment_percent: value }));

				if(loanState.home_price > 0) setLoanState(prevState => ({ ...prevState, down_payment: percent }));

			} else return

		}

		// if (e.target.id === 'loan-program') setLoanState(prevState => ({ ...prevState, loan_program: value }));
		// if(e.target.id === 'interest-rate') setLoanState(prevState => ({ ...prevState, interest_rate: value }));
		// let payment = ((amount / months) + interest).toFixed(2);
		// const interest = (amount * (interest_rate * .01)) / months;
		// const interest_rate = document.getElementById('interest_rate').value;

		// payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		// document.getElementById('payment').innerHTML = "Monthly Payment = $" + payment;

		e.stopPropagation();
	}

	useEffect(() => {

		setLoanState(prevState => ({ ...prevState, loan_program: document.querySelector('#loan-program option').value }));

	}, []);

	return (
		<div className='container-custom container-custom-sm'>
			<Row>

				<Col className='mortage-chart'>

				</Col>

				<Col className='mortage-inputs'>

					<div className="mortage-input-box d-flex flex-column my-4">
						<label htmlFor='home-price'>Home price</label>

						<div className='position-relative'>
							<input type="text" id='home-price' className='input-field input-left disable-letters' value={loanState.home_price} onChange={calculateLoan} onKeyDown={disableLetters} />
							<span className='position-absolute input-sign left d-flex flex-column justify-content-center align-items-center'>$</span>
						</div>
					</div>

					<div className="mortage-input-box d-flex flex-column my-4">
						<label htmlFor='down-payment'>Down payment</label>

						<Row className='m-0'>
							<div className='position-relative'>
								<input type="text" id='down-payment' className='input-field input-left' value={loanState.down_payment} onChange={calculateLoan} onKeyDown={disableLetters} />
								<span className='position-absolute input-sign left d-flex flex-column justify-content-center align-items-center'>$</span>
							</div>

							<div className='position-relative'>
								<input type="text" id='down-payment-percent' className='input-field input-right' value={loanState.down_payment_percent} onChange={calculateLoan} onKeyDown={disableLetters} />
								<span className='position-absolute input-sign right d-flex flex-column justify-content-center align-items-center'>%</span>
							</div>
						</Row>
					</div>

					<div className="mortage-input-box d-flex flex-column my-4">
						<label htmlFor='loan-program'>Loan Program</label>

						<select id="loan-program" className='p-1' value={loanState.loan_program} onChange={calculateLoan}>
							<option value="30-year">30 year fixed</option>
							<option value="20-year">20 year fixed</option>
							<option value="10-year">10 year fixed</option>
						</select>
					</div>

					<div className="mortage-input-box d-flex flex-column my-4">
						<label htmlFor='interest-rate'>Interest Rate</label>

						<div className='position-relative'>
							<input type="text" id='interest-rate' className='input-field input-right disable-letters' value={loanState.interest_rate} onChange={calculateLoan} onKeyDown={disableLetters} />
							<span className='position-absolute input-sign right d-flex flex-column justify-content-center align-items-center'>%</span>
						</div>
					</div>

				</Col>
			</Row>
		</div>
	)
}

export default MortageCalculator;
