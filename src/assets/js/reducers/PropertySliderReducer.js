import {

	SET_SHOWN_IMAGE,
	INCREMENT_SHOWN_IMAGE,
	DECREMENT_SHOWN_IMAGE,
	TOGGLE_SLIDER_MODAL

} from '@constants/actionTypes';

export default (state, action) => {

	switch(action.type) {

		case SET_SHOWN_IMAGE: {
			return {
				...state,
				shown_image: action.payload
			}
		}

		case TOGGLE_SLIDER_MODAL: {
			return {
				...state,
				slider_modal_visible: action.payload
			}
		}
	}
}