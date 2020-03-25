import React from 'react';

import PropertyBox from './PropertyBox';

import Row from 'react-bootstrap/row';

const SearchListings = () => {
	
	return (
		<Row id='search-listings' className='p-3 m-0 justify-content-between align-items-start'>

			<PropertyBox />
			
		</Row>
	)
}

export default SearchListings;
