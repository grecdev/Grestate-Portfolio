import {

	SET_REGEX_ALERT,
	RESET_REGEX_ALERT

} from '@constants/actionTypes';

export default (state, action) => {

	switch(action.type) {

		case SET_REGEX_ALERT:
			return {
				...state,
				[action.target]: action.payload
			}

		case RESET_REGEX_ALERT:
			return action.payload;

		default: 
			return state;
	}
}