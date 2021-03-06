import React, { useContext } from 'react';

import { FetchContext } from '@context/FetchContext';
import { GlobalContext } from '@context/GlobalContext';

import PropertyForm from '@components/global_layout/property_form/PropertyForm';
import SearchMap from '@components/search_property/SearchMap';
import SearchListings from '@components/search_property/SearchListings';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchPropertyPage = () => {

	const { loader } = useContext(FetchContext);
	const {

		location,
		isMobile

	} = useContext(GlobalContext);

	return (
		<main id='search-property'>
			<Container className='p-3 mb-2'>
				{location.includes('buy') && <PropertyForm multiple={false} buy={true} rent={false} /> }
				{location.includes('rental') && <PropertyForm multiple={false} buy={false} rent={true} /> }
			</Container>

			<Row className='m-0'>
				{
					!isMobile() && (
						<Col className='p-0 m-0'>
							<SearchMap />
						</Col>
					)
				}

				<Col className='p-0 m-0'>

					{
						loader && (

							<div className="search-listings-loader d-flex flex-column justify-content-center align-items-center">
								<div className='mx-auto'></div>
							</div>
							
						)
					}

					<div className={loader ? 'd-none' : 'd-block'}>
						<SearchListings />
					</div>

				</Col>
			</Row>
		</main>
	)
}

export default SearchPropertyPage;
