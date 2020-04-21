import {

	HANDLE_LOGIN_INPUT,
	HANDLE_SIGNUP_INPUT,
	RESET_SIGNUP_INPUTS,
	HANDLE_ACCOUNT_INPUT,
	SET_ACCOUNT_INPUTS

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

		case RESET_SIGNUP_INPUTS: {
			return action.payload
		}

		case HANDLE_ACCOUNT_INPUT: {
			return {
				...state,
				[action.target]: action.payload
			}
		}

		case SET_ACCOUNT_INPUTS: {

			return {
				...state,
				...action.payload
			}
		}

		default: return state;
	}
}