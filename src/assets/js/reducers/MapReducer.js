import {

	SET_PROPERTIES,
	TOGGLE_POPUP,
	SET_POPUP_INFO,
	SET_VIEWPORT

} from '@constants/actionTypes';

export default (state, action) => {
	
	switch (action.type) {

		case SET_PROPERTIES:
			return {
				...state,
				properties: action.payload
			}

		case TOGGLE_POPUP:
			return {
				...state,
				show_popup: action.payload
			}

		case SET_POPUP_INFO:
			return {
				...state,
				popup_info: action.payload
			}

		case SET_VIEWPORT:

			let viewport = state['viewport'];
			
			Object.assign(viewport, {
				latitude: action.payload.latitude,
				longitude: action.payload.longitude
			});

			return {
				...state,
				viewport
			}

		default:
			return state;
	}
}