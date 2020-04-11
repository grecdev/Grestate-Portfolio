import {

	GET_DATABASE,
	SET_BUY_PROPERTIES,
	SET_RENTAL_PROPERTIES,
	FILTER_BUY_PROPERTIES,
	FILTER_RENTAL_PROPERTIES,
	SET_LOADER,
	HANDLE_PROPERTY_INPUT,
	RESET_PROPERTY_INPUTS,
	RESET_BUY_INPUTS,
	RESET_RENT_INPUTS,
	SET_SHOWN_IMAGE,
	TOGGLE_SLIDER_MODAL
	
} from '@constants/actionTypes';

export default (state, action) => {

	switch (action.type) {

		case GET_DATABASE:
			return {
				...state,
				db: action.payload
			}

		case SET_BUY_PROPERTIES:
			return {
				...state,
				buy_properties: action.payload
			}

		case SET_RENTAL_PROPERTIES:
			return {
				...state,
				rent_properties: action.payload
			}

		case FILTER_BUY_PROPERTIES:
			return {
				...state,
				filtered_buy_properties: action.payload
			}

		case FILTER_RENTAL_PROPERTIES:
			return {
				...state,
				filtered_rent_properties: action.payload
			}

		case SET_LOADER:
			return {
				...state,
				loader: action.payload
			}

			case HANDLE_PROPERTY_INPUT:
			return {
				...state,
				[action.target]: action.payload
			}

		case RESET_PROPERTY_INPUTS:
			return {
				state: action.payload
			}

		case RESET_BUY_INPUTS:
			return {
				...state,
				city_buy: '',
				property_type_buy: '',
				buy_budget: ''
			}

		case RESET_RENT_INPUTS:
			return {
				...state,
				city_rent: '',
				property_type_rent: '',
				rent_budget: ''
			}

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

		default:
			return state;
	}
}