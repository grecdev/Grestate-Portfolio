import React, { useState, useContext, useEffect } from 'react';

import { FetchContext } from '../../../context/FetchContext';

// HUGE FILE
import ReactMapGL from 'react-map-gl';

import Markers from './Markers';

const SearchMap = () => {

	const { filtered_db } = useContext(FetchContext);

	const defaultData = {
		coordinates: {
			latitude: 37.422028,
			longitude: -122.084052
		},
		country: 'United States',
		city: 'California'
	}

	const [markers, setMarkers] = useState([defaultData]);

	useEffect(() => {

		const coordinates = filtered_db.map(item => {

			return {
				coordinates: item.coordinates,
				country: item.addressLocation,
				city: item.addressCity
			}
		});
		
		if(filtered_db.length > 0 ) setMarkers(coordinates);

	}, [filtered_db]);

	const [viewport, setViewport] = useState({
		width: 759,
		height: 527,
		zoom: 16
	});

	useEffect(() => {

		setViewport(prevState => ({...prevState, latitude: markers[0].coordinates.latitude, longitude: markers[0].coordinates.longitude }));

	}, [markers]);

	return (
		<section id='search-map'>
			<ReactMapGL
				{...viewport}
				onViewportChange={setViewport}
				mapboxApiAccessToken={process.env.MAP_KEY}
			>
				<Markers data={markers} />

			</ReactMapGL>
		</section>
	)
}

export default SearchMap;
