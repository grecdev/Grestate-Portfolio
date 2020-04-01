import React, { useEffect, useContext, useState } from 'react';

import { FetchContext } from '@context/FetchContext';
import { GlobalContext } from '@context/GlobalContext';

import Container from 'react-bootstrap/container';

const PropertyPage = ({ match }) => {

	const houseId = parseFloat(match.params.house.match(/\d/g).join(''));

	const {
		
		db,
		filtered_buy_properties,
		filtered_rent_properties
		
	} = useContext(FetchContext);

	const {
		
		changePage,
		location
		
	} = useContext(GlobalContext);

	// If no property has been searched we should redirect back to the searching page
	useEffect(() => {

		if(filtered_buy_properties.length === 0 && location.includes('buy')) changePage('/buy-properties');
		if(filtered_rent_properties.length === 0 && location.includes('rental')) changePage('/rental-listings');

	}, []);

	const [property, setProperty] = useState(undefined);

	useEffect(() => {

		filtered_buy_properties.length > 0 && filtered_buy_properties.filter(item => item.id === houseId && setProperty(item));
		filtered_rent_properties.length > 0 && filtered_rent_properties.filter(item => item.id === houseId && setProperty(item));

	}, []);

	useEffect(() => {

		property !== undefined && console.log(property);

	}, [property]);

	// if(property !== undefined) {

	// 	return (
	// 		<>
	// 			<h1>{property.addressLocation}</h1>	
	// 		</>
	// 	)

	// } else return null;

	return (
		<main id="property-page">
			<Container>

				

			</Container>
		</main>
	)
}

export default PropertyPage;
