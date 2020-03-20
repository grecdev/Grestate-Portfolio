import {

	TOGGLE_THROTTLE,
	SET_COUNTER

} from '../constants/actionTypes';

export default ((state, action) => {

	switch(action.type) {

		case TOGGLE_THROTTLE:
			return {
				...state,
				throttle: action.payload
			}

		case SET_COUNTER:
			return {
				...state,
				counterActive: action.payload
			}

		default:
			return state;
	}

});