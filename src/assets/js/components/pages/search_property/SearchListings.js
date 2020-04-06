import React, { useContext, useEffect, useState } from 'react';

import { GlobalContext } from '@context/GlobalContext';
import { FetchContext } from '@context/FetchContext';

import PropertyBox from './PropertyBox';
import FilterProperties from './FilterProperties';

import Row from 'react-bootstrap/row';

const SearchListings = () => {

	const {

		location,
		getImage

	} = useContext(GlobalContext);

	const {

		filtered_buy_properties,
		filtered_rent_properties

	} = useContext(FetchContext);

	const [arr, setArr] = useState([]);

	useEffect(() => {

		location.includes('buy-properties') && setArr(filtered_buy_properties);
		location.includes('rental-listings') && setArr(filtered_rent_properties);

	}, [filtered_buy_properties, filtered_rent_properties]);
	
	return (
		<Row id='search-listings' className='p-3 m-0 justify-content-between align-items-start'>

			{
				arr.length === 0 ? (

					<div className="search-not-found text-center">
						<p className='h1'>No property found, please try again.</p>
						<img className='mx-auto' src={getImage('property-not-found.png')} alt='property not found' />
					</div>

				) : (
					<>
						
						<FilterProperties array={arr} />
						<PropertyBox array={arr} />

					</>
				)
			}

		</Row>
	)
}

export default SearchListings;
