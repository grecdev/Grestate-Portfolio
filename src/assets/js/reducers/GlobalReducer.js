import {

	TOGGLE_THROTTLE,
	CHANGE_LOCATION

} from '../constants/actionTypes';

export default (state, action) => {

	switch (action.type) {

		case TOGGLE_THROTTLE:
			return {
				...state,
				throttle: action.payload
			}

		case CHANGE_LOCATION:
			return {
				...state,
				location: action.payload
			}

		default:
			return state;
	}

};