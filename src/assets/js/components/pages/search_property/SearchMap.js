import React, { useState, useReducer, useContext, useEffect } from 'react';

import { FetchContext } from '../../../context/FetchContext';
import { GlobalContext } from '../../../context/GlobalContext';

import MapReducer from '../../../reducers/MapReducer';
import {

	SET_PROPERTIES,
	TOGGLE_POPUP,
	SET_POPUP_INFO

} from '../../../constants/actionTypes';

import ReactMapGL, { GeolocateControl } from 'react-map-gl';

import Markers from './map/Markers';
import PopUp from './map/PopUp';

const SearchMap = () => {

	const { location } = useContext(GlobalContext);

	const {

		filtered_buy_properties,
		filtered_rent_properties

	} = useContext(FetchContext);

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

	const [arr, setArr] = useState([]);

	useEffect(() => {

		location.includes('buy-properties') && setArr(filtered_buy_properties);
		location.includes('rental-listings') && setArr(filtered_rent_properties);

		const properties = arr.map(item => {

			return {
				coordinates: item.coordinates,
				country: item.addressLocation,
				city: item.addressCity,
				property_id: item.id
			}
		});

		if(arr.length > 0) dispatch({ type: SET_PROPERTIES, payload: properties });
		else dispatch({ type: SET_PROPERTIES, payload: defaultData });

	}, [filtered_buy_properties, filtered_rent_properties, arr]);

	const [viewport, setViewport] = useState({
		width: 759,
		height: 528,
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
				mapStyle='mapbox://styles/mapbox/dark-v10'
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

				<GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
					trackUserLocation={true}
					style={{
						position: 'absolute',
						top: 20,
						left: 20
					}}
        />
			</ReactMapGL>
		</section>
	)
}

export default SearchMap;
