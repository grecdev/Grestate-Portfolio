import {

	GET_DATABASE
	
} from '../constants/actionTypes';

export default (state, action) => {

	switch (action.type) {

		case GET_DATABASE:
			return {
				...state,
				db: action.payload
			}

		default:
			return state;
	}
}