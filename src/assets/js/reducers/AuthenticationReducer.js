import {

	HANDLE_LOGIN_INPUT,
	HANDLE_SIGNUP_INPUT,
	RESET_AUTHENTICATION_INPUTS

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

		case RESET_AUTHENTICATION_INPUTS: {
			return {
				state: action.payload
			}
		}

		default: return state;
	}
}