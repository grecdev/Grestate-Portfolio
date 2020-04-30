import React, {

	useReducer,
	useContext,
	useEffect,
	useState,
	memo

} from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '@context/GlobalContext';

import MortageReducer from '@reducers/MortageReducer';
import {

	SET_HOME_PRICE,
	SET_DOWN_PAYMENT,
	SET_DOWN_PAYMENT_PERCENT,
	SET_LOAN_PROGRAM,
	SET_INTEREST_RATE,
	RESET_DOWN_PAYMENT,
	RESET_MORTAGE_INPUTS

} from '@constants/actionTypes';

import RegexAlert from '@components/global_layout/RegexAlert';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MortageCalculator = ({getTotalPayment}) => {

	const { disableLetters } = useContext(GlobalContext);

	const initialState = {
		home_price: '100,000',
		down_payment: '10,000',
		down_payment_percent: 10,
		loan_program: 0,
		interest_rate: 2,
		required_home_price: 50000
	}

	const [state, dispatch] = useReducer(MortageReducer, initialState);

	const calculateTotalPayment = (homePrice, downPayment, interestRate, months) => {

		let rate = interestRate / 1200;

		const principal_interest = Math.ceil((homePrice - downPayment) * (rate * Math.pow((1 + rate), months)) / (Math.pow((1 + rate), months) - 1));
		const insurance = Math.ceil(principal_interest /7);
		const taxes = Math.ceil(principal_interest / 4);
		const payment_per_month = principal_interest + insurance + taxes;
		
		getTotalPayment({
			principal_interest,
			insurance,
			taxes,
			payment_per_month
		});
	}

	const convertToNumber = input => {

		const match = input.match(/[\d\.]/g);

		if(match !== null) return parseFloat(match.join(''));
		else return 0;
	
	};

	const formatNumber = input => {

		let str = String(input).replace(/\,/g, '');

		return parseFloat(str).toLocaleString();
	}

	const [calculator_regex, setCalculatorRegex] = useState({
		home_price: undefined,
		down_payment: undefined,
		down_payment_percent: undefined,
		interest_rate: undefined
	});

	const calculateLoan = e => {

		let ecuation;

		const { value, id } = e.target;

		const isEmpty = value.length === 0;
		const target = id.replace(/\-/g, '_');
		const homePrice = document.getElementById('home-price').value;
		const downPayment = document.getElementById('down-payment').value;
		const downPaymentPercent = document.getElementById('down-payment-percent').value.replace(/\,/g, '.');
		const loanProgram = document.getElementById('loan-program').value;
		const interestRate = document.getElementById('interest-rate').value.replace(/\,/g, '.');
		const months = parseFloat(loanProgram) * 12;
	
		if (id === 'home-price') {

			if(convertToNumber(value) > 1000000000) {

				setCalculatorRegex(prevState => ({ ...prevState, [target]: 'Maximum home price exceeded' }));

				return	
			}

			// Formatted number
			dispatch({ type: SET_HOME_PRICE, payload: formatNumber(homePrice) });

			// Find out the down payment according to percentage
			if(downPaymentPercent.length > 0) {

				ecuation = (convertToNumber(downPaymentPercent) / 100) * convertToNumber(homePrice);
				dispatch({type: SET_DOWN_PAYMENT, payload: formatNumber(ecuation)});
			}

			// Reset all inputs
			if(isEmpty) {

				setCalculatorRegex(prevState => ({ ...prevState, [target]: 'Invalid Home price' }));

				dispatch({ type: RESET_MORTAGE_INPUTS });

			} else {

				setCalculatorRegex(prevState => ({ ...prevState, [target]: undefined }));
			}
			
			calculateTotalPayment(convertToNumber(homePrice), ecuation, convertToNumber(interestRate), months);			
		}

		if(id === 'down-payment') {

			if(convertToNumber(downPayment) > convertToNumber(homePrice)) {

				setCalculatorRegex(prevState => ({ ...prevState, [target]: 'Down payment must be less than home price' }));

				setTimeout(() => setCalculatorRegex(prevState => ({ ...prevState, [target]: undefined })), 3000);

				return;
			}

			if(downPayment.length === 0) calculateTotalPayment(0, 0, 0, 0);
			else calculateTotalPayment(convertToNumber(homePrice), convertToNumber(downPayment), convertToNumber(interestRate), months);

			// Formatted number
			dispatch({type: SET_DOWN_PAYMENT, payload: formatNumber(downPayment) });

			// Find out the down payment percentage value according to down payment sum
			ecuation = (convertToNumber(downPayment) / convertToNumber(homePrice)) * 100;
			dispatch({type: SET_DOWN_PAYMENT_PERCENT, payload: ecuation});

			if(isEmpty) {

				setCalculatorRegex(prevState => ({ ...prevState, [target]: 'Invalid down payment' }));

				dispatch({type: RESET_DOWN_PAYMENT });

			} else {

				setCalculatorRegex(prevState => ({
					...prevState,
					[target]: undefined,
					home_price: undefined,
					down_payment_percent: undefined
				}));
			}
		}

		if(id === 'down-payment-percent') {

			if(convertToNumber(downPaymentPercent) > 100) {
			
				setCalculatorRegex(prevState => ({ ...prevState, [target]: 'Down payment percent must be less than 100%' }));

				setTimeout(() => setCalculatorRegex(prevState => ({ ...prevState, [target]: undefined })), 3000);

				return;
			}

			// Formatted number
			dispatch({type: SET_DOWN_PAYMENT_PERCENT, payload: downPaymentPercent });

			// Find out the down payment percentage according to down payment sum
			ecuation = convertToNumber(downPaymentPercent) / 100 * convertToNumber(homePrice);
			dispatch({type: SET_DOWN_PAYMENT, payload: formatNumber(ecuation)})

			if(downPaymentPercent.length === 0) calculateTotalPayment(0, 0, 0, 0);
			else calculateTotalPayment(convertToNumber(homePrice), ecuation, convertToNumber(interestRate), months);

			if(isEmpty) {
				
				setCalculatorRegex(prevState => ({ ...prevState, [target]: 'Invalid down payment percent' }));
				dispatch({type: RESET_DOWN_PAYMENT});

			} else {

				setCalculatorRegex(prevState => ({
					...prevState,
					[target]: undefined,
					home_price: undefined,
					down_payment: undefined
				}));
			}
		}

		if (id === 'loan-program') {

			dispatch({ type: SET_LOAN_PROGRAM, payload: loanProgram });

			calculateTotalPayment(convertToNumber(homePrice), convertToNumber(downPayment), convertToNumber(interestRate), months);
		}

		if(id === 'interest-rate') {

			if(convertToNumber(interestRate) > 100) {

				setCalculatorRegex(prevState => ({ ...prevState, [target]: 'Interest rate must be less than 100%' }));

				setTimeout(() => setCalculatorRegex(prevState => ({ ...prevState, [target]: undefined })), 3000);

				return;
			}

			if(isEmpty) setCalculatorRegex(prevState => ({ ...prevState, [target]: 'Invalid Interest rate' }));
			else setCalculatorRegex(prevState => ({ ...prevState, [target]: undefined }));

			dispatch({ type: SET_INTEREST_RATE, payload: interestRate });

			calculateTotalPayment(convertToNumber(homePrice), convertToNumber(downPayment), convertToNumber(interestRate), months);
		}

		e.stopPropagation();
	}

	useEffect(() => {

		const months = parseFloat(document.querySelector('#loan-program').value) * 12;

		calculateTotalPayment(convertToNumber(state.home_price), convertToNumber(state.down_payment), state.interest_rate, months);

	}, []);

	return (

		<div className='mortage-inputs'>

			<div className="mortage-input-box d-flex flex-column my-3">
				<label htmlFor='home-price'>Home price</label>

					<div className='position-relative'>
						<input 
							type="text" 
							id='home-price' 
							className='input-field input-left disable-letters' 
							value={state.home_price} 
							onChange={calculateLoan} 
							onKeyDown={disableLetters}
						/>
						<span className='position-absolute input-sign left d-flex flex-column justify-content-center align-items-center'>$</span>
					</div>

					{calculator_regex.home_price && <RegexAlert text={calculator_regex.home_price} danger={true} />}
			</div>

			<div className="mortage-input-box d-flex flex-column my-3">
				<label htmlFor='down-payment'>Down payment</label>
				<label htmlFor='down-payment-percent' className='d-none'>Down payment percent</label>

				<Row className='m-0'>
					<div className='position-relative'>
						<input 
							type="text" 
							id='down-payment' 
							className='input-field input-left' 
							value={state.down_payment} 
							onChange={calculateLoan} 
							onKeyDown={disableLetters}
						/>
						<span className='position-absolute input-sign left d-flex flex-column justify-content-center align-items-center'>$</span>
					</div>

					<div className='position-relative'>
						<input 
							type="text" 
							id='down-payment-percent' 
							className='input-field input-right' 
							value={state.down_payment_percent} 
							onChange={calculateLoan} 
							onKeyDown={disableLetters}
						/>
						<span className='position-absolute input-sign right d-flex flex-column justify-content-center align-items-center'>%</span>
					</div>
				</Row>

				{calculator_regex.down_payment && <RegexAlert text={calculator_regex.down_payment} danger={true} />}
				{calculator_regex.down_payment_percent && <RegexAlert text={calculator_regex.down_payment_percent} danger={true} />}
			</div>

			<div className="mortage-input-box d-flex flex-column my-3">
				<label htmlFor='loan-program'>Loan Program</label>

				<select id="loan-program" className='p-1' value={state.loan_program} onChange={calculateLoan}>
					<option value="30-year">30 year fixed</option>
					<option value="20-year">20 year fixed</option>
					<option value="10-year">10 year fixed</option>
				</select>
			</div>

			<div className="mortage-input-box d-flex flex-column my-3">
				<label htmlFor='interest-rate'>Interest Rate</label>

				<div className='position-relative'>
					<input type="text" id='interest-rate' className='input-field input-right disable-letters' value={state.interest_rate} onChange={calculateLoan} onKeyDown={disableLetters} />
					<span className='position-absolute input-sign right d-flex flex-column justify-content-center align-items-center'>%</span>
				</div>

				{calculator_regex.interest_rate && <RegexAlert text={calculator_regex.interest_rate} danger={true} />}
			</div>

		</div>
	)
}

MortageCalculator.propTypes = {
	getTotalPayment: PropTypes.func.isRequired
}

export default memo(MortageCalculator);
