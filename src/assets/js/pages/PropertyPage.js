import React, { useEffect, useContext, useState, useReducer} from 'react';

import { FetchContext } from '@context/FetchContext';
import { GlobalContext } from '@context/GlobalContext';

import PropertySliderReducer from '@reducers/PropertySliderReducer';

import {

	SET_SHOWN_IMAGE,
	TOGGLE_SLIDER_MODAL

} from '@constants/actionTypes';

import ImageSliderSmall from '@components/pages/property_page/ImageSliderSmall';
import ImageSliderBig from '@components/pages/property_page/ImageSliderBig';
import PropertyDetails from '@components/pages/property_page/PropertyDetails';
import AgentListing from '@components/pages/property_page/AgentListing';

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

		// if(location.includes('buy') && filtered_buy_properties.length > 0) filtered_buy_properties.filter(item => item.id === houseId && setProperty(item));
		// if(location.includes('rent') && filtered_rent_properties.length > 0) filtered_rent_properties.filter(item => item.id === houseId && setProperty(item));

		db.filter(item => item.id === houseId && setProperty(item));

		/// CHANGE HERE
		// [filtered_buy_properties, filtered_rent_properties]
	});

	const defaultSliderState = {
		// This is the image that we display it when we first enter on the page
		// And when we click on the smaller image, display it on the big slider
		shown_image: 0,
		slider_modal_visible: false
	}

	const [slider_state, dispatch] = useReducer(PropertySliderReducer, defaultSliderState);

	const setShownImage = val => dispatch({ type: SET_SHOWN_IMAGE, payload: val });

	const toggleSliderModal = val => dispatch({ type: TOGGLE_SLIDER_MODAL, payload: val });

	if(property !== undefined) {

		return (
			<main id="property-page">
				<Container className='py-4 px-0'>

				<Row className='m-0 align-items-start'>
					<Col id='left-side' className='col-lg-8 p-0'>

						<ImageSliderSmall 
							images={property.propertyImages.reviewImages}
							shownImage={slider_state.shown_image}
							transitionTime={300}
							setShownImage={setShownImage}
							toggleSliderModal={toggleSliderModal}
						/>

						<PropertyDetails info={property} />
						
					</Col>

					<Col id='right-side' className='col-lg-4 p-0'>
						<AgentListing agent={property.listingAgent} />
					</Col>	
				</Row>

				{slider_state.slider_modal_visible && (

					<ImageSliderBig 
						images={property.propertyImages.reviewImages}
						shownImage={slider_state.shown_image}
						transitionTime={500}
						setShownImage={setShownImage}
						toggleSliderModal={toggleSliderModal}
					/>

				)}

				</Container>
			</main>
		)

	} else return null;
}

export default PropertyPage;
