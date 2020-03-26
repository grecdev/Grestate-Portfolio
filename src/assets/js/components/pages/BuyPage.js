import React, { useContext } from 'react';

import { FetchContext } from '../../context/FetchContext';

import PropertyForm from '../global_layout/property_form/PropertyForm';
import SearchMap from './buy/SearchMap';
import SearchListings from './buy/SearchListings';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BuyPage = () => {

	const { loader } = useContext(FetchContext);

	return (
		<main id='search-property'>
			<Container className='p-3 mb-2'>
				<PropertyForm multiple={false} buy={true} rent={false} />
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

export default BuyPage;
