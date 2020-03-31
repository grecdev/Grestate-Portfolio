import {

	SET_INPUT_VALUE,
	RESET_INPUTS,
	RESET_BUY_INPUTS,
	RESET_RENT_INPUTS

} from '../constants/actionTypes';

export default (state, action) => {

	switch(action.type) {

		case SET_INPUT_VALUE:
			return {
				...state,
				[action.target]: action.payload
			}

		case RESET_INPUTS:
			return {
				state: action.payload
			}

		case RESET_BUY_INPUTS:
			return {
				...state,
				city_buy: '',
				property_type_buy: '',
				buy_budget: ''
			}

		case RESET_RENT_INPUTS:
			return {
				...state,
				city_rent: '',
				property_type_rent: '',
				rent_budget: ''
			}

		default:
			return state;
	}
};