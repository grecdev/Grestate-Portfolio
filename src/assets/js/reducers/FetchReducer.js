import {

	GET_DATABASE,
	FILTER_DATABASE,
	SET_LOADER
	
} from '../constants/actionTypes';

export default (state, action) => {

	switch (action.type) {

		case GET_DATABASE:
			return {
				...state,
				db: action.payload
			}

		case FILTER_DATABASE:
			return {
				...state,
				loader: true,
				filtered_db: action.payload
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