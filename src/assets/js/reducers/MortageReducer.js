import {

	SET_HOME_PRICE,
	SET_DOWN_PAYMENT,
	SET_DOWN_PAYMENT_PERCENT,
	SET_LOAN_PROGRAM,
	SET_INTEREST_RATE,
	RESET_DOWN_PAYMENT,
	RESET_MORTAGE_INPUTS

} from '../constants/actionTypes';

export default (state, action) => {

	switch(action.type) {

		case SET_HOME_PRICE:
			return {
				...state,
				home_price: action.payload
			}

		case SET_DOWN_PAYMENT:
			return {
				...state,
				down_payment: action.payload
			}

		case SET_DOWN_PAYMENT_PERCENT:
			return {
				...state,
				down_payment_percent: action.payload
			}

		case SET_LOAN_PROGRAM:
			return {
				...state,
				loan_program: action.payload
			}

		case SET_INTEREST_RATE:
			return {
				...state,
				interest_rate: action.payload
			}

		case RESET_DOWN_PAYMENT:
			return {
				...state,
				down_payment: '',
				down_payment_percent: ''
			}

		case RESET_MORTAGE_INPUTS:
			return {
				...state,
				home_price: '',
				down_payment: '',
				down_payment_percent: ''
			}
		
		default:
			return state;
	}
}