import {

	HANDLE_LOGIN_INPUT,
	HANDLE_SIGNUP_INPUT

} from '@constants/actionTypes';

export default (state, action) => {

	switch(action.type) {

		case HANDLE_LOGIN_INPUT: {
			return {
				...state,
				[action.target]: action.payload
			}
		}

		case HANDLE_SIGNUP_INPUT: {
			return {
				...state,
				[action.target]: action.payload
			}
		}

		default: return state;
	}
}