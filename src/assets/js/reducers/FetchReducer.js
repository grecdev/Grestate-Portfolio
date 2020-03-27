import {

	GET_DATABASE,
	FILTER_BUY_PROPERTIES,
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

		case SET_LOADER:
			return {
				...state,
				loader: action.payload
			}

		default:
			return state;
	}
}