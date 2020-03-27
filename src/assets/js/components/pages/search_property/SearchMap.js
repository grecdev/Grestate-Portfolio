import React, { useState, useReducer, useContext, useEffect } from 'react';

import { FetchContext } from '../../../context/FetchContext';
import MapReducer from '../../../reducers/MapReducer';
import {

	SET_VIEWPORT,
	SET_PROPERTIES,
	TOGGLE_POPUP,
	SET_POPUP_INFO

} from '../../../constants/actionTypes';

// HUGE FILE
import ReactMapGL from 'react-map-gl';

import Markers from './map/Markers';
import PopUp from './map/PopUp';

const SearchMap = () => {

	const { filtered_buy_properties } = useContext(FetchContext);

	const defaultData = [
		{
			coordinates: {
				latitude: 37.422028,
				longitude: -122.084052
			},
			country: 'United States',
			city: 'California'
		}
	];

	const defaultMapState = {
		properties: defaultData,
		show_popup: false,
		popup_info: defaultData
	}

	const [state, dispatch] = useReducer(MapReducer, defaultMapState);

	const togglePopup = val => dispatch({ type: TOGGLE_POPUP, payload: val });

	const getPropertyInfo = index => dispatch({ type: SET_POPUP_INFO, payload: state.properties[index] });

	useEffect(() => {

		const properties = filtered_buy_properties.map(item => {

			console.log(item);

			return {
				coordinates: item.coordinates,
				country: item.addressLocation,
				city: item.addressCity,
				property_id: item.id
			}
		});

		if(filtered_buy_properties.length > 0 ) dispatch({ type: SET_PROPERTIES, payload: properties });

	}, [filtered_buy_properties]);

	const [viewport, setViewport] = useState({
		width: 759,
		height: 527,
		zoom: 16,
		latitude: undefined,
		longitude: undefined
	})

	useEffect(() => {

		setViewport(prevState => ({
			...prevState, 
			latitude: state.properties[0].coordinates.latitude,
			longitude: state.properties[0].coordinates.longitude
		}));

	}, [state.properties]);

	return (
		<section id='search-map'>
			<ReactMapGL
				{...viewport}
				onViewportChange={setViewport}
				mapboxApiAccessToken={process.env.MAP_KEY}
			>
				<Markers
					data={state.properties}
					togglePopup={togglePopup}
					getPropertyInfo={getPropertyInfo}
					showPopup={state.show_popup}
				/>
				<PopUp
					showPopup={state.show_popup}
					togglePopup={togglePopup}
					popupInfo={state.popup_info}
				/>
			</ReactMapGL>
		</section>
	)
}

export default SearchMap;
