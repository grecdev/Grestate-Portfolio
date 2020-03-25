import {

	SET_INPUT_VALUE,
	RESET_INPUTS

} from '../constants/actionTypes';


export default (state, action) => {

	switch(action.type) {

		case SET_INPUT_VALUE:
			return {
				...state,
				[action.target]: action.payload
			}

		case RESET_INPUTS:
			return {
				state: action.payload
			}

		default:
			return state;
	}
};