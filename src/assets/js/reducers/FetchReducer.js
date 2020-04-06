import {

	GET_DATABASE,
	SET_BUY_PROPERTIES,
	SET_RENTAL_PROPERTIES,
	RESET_BUY_PROPERTIES,
	RESET_RENTAL_PROPERTIES,
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
				loader: true,
				buy_properties: action.payload
			}

		case SET_RENTAL_PROPERTIES:
			return {
				...state,
				loader: true,
				rent_properties: action.payload
			}

		case RESET_BUY_PROPERTIES:
			return {
				...state,
				buy_properties: []
			}

		case RESET_RENTAL_PROPERTIES:
			return {
				...state,
				rent_properties: []
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