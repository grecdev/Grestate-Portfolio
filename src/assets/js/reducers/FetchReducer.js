import {

	GET_DATABASE,
	SET_BUY_PROPERTIES,
	SET_RENTAL_PROPERTIES,
	FILTER_BUY_PROPERTIES,
	FILTER_RENTAL_PROPERTIES,
	SET_LOADER
	
} from '@constants/actionTypes';

export default (state, action) => {

	switch (action.type) {

		case GET_DATABASE:
			return {
				...state,
				db: action.payload
			}

		case SET_BUY_PROPERTIES:
			return {
				...state,
				buy_properties: action.payload
			}

		case SET_RENTAL_PROPERTIES:
			return {
				...state,
				rent_properties: action.payload
			}

		case FILTER_BUY_PROPERTIES:
			return {
				...state,
				filtered_buy_properties: action.payload
			}

		case FILTER_RENTAL_PROPERTIES:
			return {
				...state,
				filtered_rent_properties: action.payload
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