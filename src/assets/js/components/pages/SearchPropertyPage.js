import React, { useContext } from 'react';

import { FetchContext } from '../../context/FetchContext';
import { GlobalContext } from '../../context/GlobalContext';

import PropertyForm from '../global_layout/property_form/PropertyForm';
import SearchMap from './search_property/SearchMap';
import SearchListings from './search_property/SearchListings';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchPropertyPage = () => {

	const { loader } = useContext(FetchContext);
	const { location } = useContext(GlobalContext);

	return (
		<main id='search-property'>
			<Container className='p-3 mb-2'>
				{location.includes('buy') && <PropertyForm multiple={false} buy={true} rent={false} /> }
				{location.includes('rental') && <PropertyForm multiple={false} buy={false} rent={true} /> }
			</Container>

			<Row className='m-0'>
				<Col className='col-lg-6 p-0 m-0'>
					<SearchMap />
				</Col>

				<Col className='col-lg-6 p-0 m-0'>

					{loader ? (

						<div className="search-listings-loader d-flex flex-column justify-content-center align-items-center">
							<div className='mx-auto'></div>
						</div>

					) :  <SearchListings /> }

				</Col>
			</Row>
		</main>
	)
}

export default SearchPropertyPage;
