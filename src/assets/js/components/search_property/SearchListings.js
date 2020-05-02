import React, {

	useContext, 
	useEffect, 
	useState,
	memo

} from 'react';

import { GlobalContext } from '@context/GlobalContext';
import { FetchContext } from '@context/FetchContext';

import Image from '@components/global_layout/Image';
import PropertyBox from './PropertyBox';
import FilterProperties from './FilterProperties';

import Row from 'react-bootstrap/row';

const SearchListings = () => {

	const {

		location

	} = useContext(GlobalContext);

	const {

		db,
		buy_properties,
		rent_properties,
		filtered_buy_properties,
		filtered_rent_properties

	} = useContext(FetchContext);

	let [arr, setArr] = useState(db);

	// useEffect(() => {

	// 	if(location.includes('buy')) {

	// 		if(filtered_buy_properties.length === 0) setArr(buy_properties);
	// 		else setArr(filtered_buy_properties);
	// 	}

	// 	if(location.includes('rent')) {

	// 		if(filtered_rent_properties.length === 0) setArr(rent_properties);
	// 		else setArr(filtered_rent_properties);
	// 	}

	// }, [buy_properties, filtered_buy_properties, rent_properties, filtered_rent_properties]);
	
	return (
		<Row id='search-listings' className='p-3 m-0 d-flex flex-column justify-content-start align-items-around'>

			{
				arr.length === 0 ? (

					<div className="search-not-found text-center">
						<p className='h1'>No property found, please try again.</p>
						
						<div className="mx-auto">
							<Image src='property-not-found.png' />
						</div>
					</div>

				) : (
					<>
						
						<FilterProperties array={arr} />

						<div className="w-100 overflow-auto d-flex flex-wrap flex-row justify-content-around align-items-start">
							<PropertyBox array={arr} />
						</div>

					</>
				)
			}

		</Row>
	)
}

export default memo(SearchListings);
