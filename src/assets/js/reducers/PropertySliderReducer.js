import {

	SET_SHOWN_IMAGE

} from '@constants/actionTypes';

export default (state, action) => {

	switch(action.type) {

		case SET_SHOWN_IMAGE: {
			return {
				...state,
				shown_image: action.payload
			}
		}
	}
}