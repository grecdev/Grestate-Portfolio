import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FetchContext } from '@context/FetchContext';
import { GlobalContext } from '@context/GlobalContext';

import { v4 as uuidv4 } from 'uuid';

import { Popup } from 'react-map-gl';

const PopUp = ({ showPopup, togglePopup, popupInfo }) => {

	const {

		filtered_buy_properties,
		filtered_rent_properties

	} = useContext(FetchContext);

	const { location } = useContext(GlobalContext);

	useEffect(() => {

		togglePopup(false);

	}, [filtered_buy_properties, filtered_rent_properties]);
	
	return showPopup ? (

	<Popup
			key={uuidv4()}
			latitude={popupInfo.coordinates.latitude}
			longitude={popupInfo.coordinates.longitude}
			offsetTop={30}
			offsetLeft={12}
			closeOnClick={false}
			onClose={() => togglePopup(false)}
			anchor="top">
			<div>
				<p className='mb-2'>{popupInfo.country}</p>
				<p className='mb-2'>{popupInfo.city}</p>
				<p className='mb-2'>Latitude: {popupInfo.coordinates.latitude}</p>
				<p className='mb-2'>Longitude: {popupInfo.coordinates.longitude}</p>
				<p className='mb-0 font-weight-light'>To search the location on google maps: {popupInfo.coordinates.latitude}, {popupInfo.coordinates.longitude}</p>
				{ popupInfo.property_id && location.includes('buy') ? <Link to={`/buy-properties/house-${popupInfo.property_id}`} className='mb-2'>More about this property</Link> : null }

				{ popupInfo.property_id && location.includes('rent') ? <Link to={`/rental-listings/house-${popupInfo.property_id}`} className='mb-2'>More about this property</Link> : null }
			</div>
		</Popup>

	) : null;

}

PopUp.propTypes = {
	showPopup: PropTypes.bool.isRequired,
	togglePopup: PropTypes.func.isRequired
}

export default PopUp;
