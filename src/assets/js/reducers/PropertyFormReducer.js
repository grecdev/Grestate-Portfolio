import {

	HANDLE_PROPERTY_INPUT,
	RESET_PROPERTY_INPUTS,
	RESET_BUY_INPUTS,
	RESET_RENT_INPUTS

} from '@constants/actionTypes';

export default (state, action) => {

	switch(action.type) {

		case HANDLE_PROPERTY_INPUT:
			return {
				...state,
				[action.target]: action.payload
			}

		case RESET_PROPERTY_INPUTS:
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