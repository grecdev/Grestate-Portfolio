import React, { useEffect, useContext } from 'react';

import { FetchContext } from '@context/FetchContext';
import { GlobalContext } from '@context/GlobalContext';

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


	useEffect(() => {

		if(filtered_buy_properties.length === 0 && location.includes('buy')) changePage('/buy-properties');
		if(filtered_rent_properties.length === 0 && location.includes('rental')) changePage('/rental-listings');

	}, []);

	return (
		<>
			<h1>Property Page</h1>	
		</>
	)
}

export default PropertyPage;
