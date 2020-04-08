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

		buy_properties,
		rent_properties,
		filtered_buy_properties,
		filtered_rent_properties

	} = useContext(FetchContext);

	let [arr, setArr] = useState([]);

	useEffect(() => {

		if(location.includes('buy')) {

			if(filtered_buy_properties.length === 0) setArr(buy_properties);
			else setArr(filtered_buy_properties);
		}

		if(location.includes('rent')) {

			if(filtered_rent_properties.length === 0) setArr(rent_properties);
			else setArr(filtered_rent_properties);
		}

	}, [buy_properties, filtered_buy_properties, rent_properties, filtered_rent_properties]);
	
	return (
		<Row id='search-listings' className='p-3 m-0 d-flex flex-column justify-content-start align-items-start'>

			{
				arr.length === 0 ? (

					<div className="search-not-found text-center">
						<p className='h1'>No property found, please try again.</p>
						<img className='mx-auto' src={getImage('property-not-found.png')} alt='property not found' />
					</div>

				) : (
					<>
						
						<FilterProperties array={arr} />

						<div className="w-100 d-flex flex-row justify-content-around align-items-center">
							<PropertyBox array={arr} />
						</div>

					</>
				)
			}

		</Row>
	)
}

export default SearchListings;