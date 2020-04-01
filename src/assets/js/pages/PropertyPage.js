import React, { useEffect, useContext, useState } from 'react';

import { FetchContext } from '@context/FetchContext';
import { GlobalContext } from '@context/GlobalContext';

import ImagesSlider_small from '@components/pages/property_page/ImagesSlider_small';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

		// if(filtered_buy_properties.length === 0 && location.includes('buy')) changePage('/buy-properties');
		// if(filtered_rent_properties.length === 0 && location.includes('rental')) changePage('/rental-listings');

	}, []);

	const [property, setProperty] = useState(undefined);

	useEffect(() => {

		db.filter(item => item.id === houseId && setProperty(item));

	}, [filtered_buy_properties, filtered_rent_properties]);

	// if(property !== undefined) {

	// 	return (
	// 		<main id="property-page">
	// 			<Container className='py-4 px-0'>

	// 			<Row className='m-0'>
	// 				<Col id='left-side' className='col-lg-8 p-0'>

	// 					<ImagesSlider_small images={property.propertyImages}/>

	// 				</Col>

	// 				<Col id='right-side' className='col-lg-4 p-0'>
	// 					Right side
	// 				</Col>	
	// 			</Row>

	// 			</Container>
	// 		</main>
	// 	)

	// } else return null;

	console.log(property);

	return (
		<main id="property-page">
			<Container className='py-4 px-0'>

			<Row className='m-0'>
				<Col id='left-side' className='col-lg-7 p-0'>

					<ImagesSlider_small />

				</Col>

				<Col id='right-side' className='col-lg-4 p-0'>
					Right side
				</Col>	
			</Row>

			</Container>
		</main>
	)
}

export default PropertyPage;
