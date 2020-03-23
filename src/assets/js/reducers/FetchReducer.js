import {

	GET_DATABASE,
	FILTER_DATABASE
	
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
				filtered_db: action.payload
			}

		default:
			return state;
	}
}