import React, { useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '../../../context/GlobalContext';

import MortageReducer from '../../../reducers/MortageReducer';
import {

	SET_HOME_PRICE,
	SET_DOWN_PAYMENT,
	SET_DOWN_PAYMENT_PERCENT,
	SET_LOAN_PROGRAM,
	SET_INTEREST_RATE,
	SET_TOTAL_PAYMENT

} from '../../../constants/actionTypes';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MortageCalculator = ({getTotalPayment}) => {

	const { disableLetters } = useContext(GlobalContext);

	const initialState = {
		home_price: 300100,
		down_payment: 30010,
		down_payment_percent: 10,
		loan_program: 0,
		interest_rate: 2,
		total_payment: 0,
		insurance: 0,
		taxes: 0
	}

	const [state, dispatch] = useReducer(MortageReducer, initialState);

	const calculateTotalPayment = (homePrice, downPayment, interestRate, months) => (homePrice - downPayment) * (interestRate * Math.pow((1 + interestRate), months)) / (Math.pow((1 + interestRate), months) - 1);

	const calculateLoan = e => {

		let value, percent, payment, homePrice, downPayment, months, interestRate, totalPayment, insurance, taxes;

		homePrice = parseFloat(document.getElementById('home-price').value);
		downPayment = parseFloat(document.getElementById('down-payment').value);
		months = parseFloat(document.getElementById('loan-program').value) * 12;
		interestRate = parseFloat(document.getElementById('interest-rate').value) / 1200;

		if(e.target.tagName === 'INPUT') e.target.value.length > 0 ? value = parseFloat(e.target.value) : value = 0;
		else value = e.target.value;
	
		if (e.target.id === 'home-price') {

			payment = (value / 100) * downPayment;
			dispatch({ type: SET_HOME_PRICE, payload: value });

			if(downPayment > 0) {

				dispatch({ type: SET_DOWN_PAYMENT, payload: payment });
				downPayment = payment;
			}
		}

		if(e.target.id === 'down-payment') {

			percent = value * 100 / homePrice;
			dispatch({ type: SET_DOWN_PAYMENT, payload: value });

			if(homePrice > 0) dispatch({ type: SET_DOWN_PAYMENT_PERCENT, payload: percent });
		}

		if(e.target.id === 'down-payment-percent') {

			if(value <= 100) {

				payment = (homePrice / 100) * value;

				dispatch({ type: SET_DOWN_PAYMENT_PERCENT, payload: value });

				if(homePrice > 0) {

					dispatch({ type: SET_DOWN_PAYMENT, payload: payment });
					downPayment = payment;
				}

			} else return
		}

		if (e.target.id === 'loan-program') dispatch({ type: SET_LOAN_PROGRAM, payload: value });

		if(e.target.id === 'interest-rate') {

			value <= 100 ? dispatch({ type: SET_INTEREST_RATE, payload: value }) : null
		}

		totalPayment = calculateTotalPayment(homePrice, downPayment, interestRate, months);

		insurance = totalPayment / 10;
		taxes = totalPayment / 6;

		dispatch({
			type: SET_TOTAL_PAYMENT,
			payload: {
				total_payment: totalPayment,
				insurance,
				taxes
			}
		});

		getTotalPayment({totalPayment, insurance, taxes});

		e.stopPropagation();
	}

	useEffect(() => {

		const loanProgram = parseFloat(document.querySelector('#loan-program').value) * 12;

		const totalPayment = calculateTotalPayment(state.home_price, state.down_payment, state.interest_rate / 1200, loanProgram);
		const insurance = totalPayment / 10;
		const taxes = totalPayment / 6;

		getTotalPayment({totalPayment, insurance, taxes});

	}, []);

	return (

		<Col className='mortage-inputs'>

			<div className="mortage-input-box d-flex flex-column my-4">
				<label htmlFor='home-price'>Home price</label>

				<div className='position-relative'>
					<input type="text" id='home-price' className='input-field input-left disable-letters' value={state.home_price} onChange={calculateLoan} onKeyDown={disableLetters} />
					<span className='position-absolute input-sign left d-flex flex-column justify-content-center align-items-center'>$</span>
				</div>
			</div>

			<div className="mortage-input-box d-flex flex-column my-4">
				<label htmlFor='down-payment'>Down payment</label>

				<Row className='m-0'>
					<div className='position-relative'>
						<input type="text" id='down-payment' className='input-field input-left' value={state.down_payment} onChange={calculateLoan} onKeyDown={disableLetters} />
						<span className='position-absolute input-sign left d-flex flex-column justify-content-center align-items-center'>$</span>
					</div>

					<div className='position-relative'>
						<input type="text" id='down-payment-percent' className='input-field input-right' value={state.down_payment_percent} onChange={calculateLoan} onKeyDown={disableLetters} />
						<span className='position-absolute input-sign right d-flex flex-column justify-content-center align-items-center'>%</span>
					</div>
				</Row>
			</div>

			<div className="mortage-input-box d-flex flex-column my-4">
				<label htmlFor='loan-program'>Loan Program</label>

				<select id="loan-program" className='p-1' value={state.loan_program} onChange={calculateLoan}>
					<option value="30-year">30 year fixed</option>
					<option value="20-year">20 year fixed</option>
					<option value="10-year">10 year fixed</option>
				</select>
			</div>

			<div className="mortage-input-box d-flex flex-column my-4">
				<label htmlFor='interest-rate'>Interest Rate</label>

				<div className='position-relative'>
					<input type="text" id='interest-rate' className='input-field input-right disable-letters' value={state.interest_rate} onChange={calculateLoan} onKeyDown={disableLetters} />
					<span className='position-absolute input-sign right d-flex flex-column justify-content-center align-items-center'>%</span>
				</div>
			</div>

		</Col>

	)
}

MortageCalculator.propTypes = {
	getTotalPayment: PropTypes.func.isRequired
}

export default MortageCalculator;
