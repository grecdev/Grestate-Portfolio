import {

	GET_DATABASE,
	FILTER_BUY_PROPERTIES,
	FILTER_RENTAL_PROPERTIES,
	RESET_BUY_PROPERTIES,
	RESET_RENTAL_PROPERTIES,
	SET_LOADER
	
} from '../constants/actionTypes';

export default (state, action) => {

	switch (action.type) {

		case GET_DATABASE:
			return {
				...state,
				db: action.payload
			}

		case FILTER_BUY_PROPERTIES:
			return {
				...state,
				loader: true,
				filtered_buy_properties: action.payload
			}

		case FILTER_RENTAL_PROPERTIES:
			return {
				...state,
				loader: true,
				filtered_rent_properties: action.payload
			}

		case RESET_BUY_PROPERTIES:
			return {
				...state,
				filtered_buy_properties: []
			}

		case RESET_RENTAL_PROPERTIES:
			return {
				...state,
				filtered_rent_properties: []
			}

		case SET_LOADER:
			return {
				...state,
				loader: action.payload
			}

		default:
			return state;
	}
}