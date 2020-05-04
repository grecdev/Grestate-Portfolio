import React, {
	
	useEffect, 
	useContext, 
	useState, 
	useReducer,
	memo

} from 'react';

import { FetchContext } from '@context/FetchContext';
import { GlobalContext } from '@context/GlobalContext';

import PropertySliderReducer from '@reducers/PropertySliderReducer';

import {

	SET_SHOWN_IMAGE,
	TOGGLE_SLIDER_MODAL

} from '@constants/actionTypes';

import ImageSliderSmall from '@components/property_page/ImageSliderSmall';
import ImageSliderBig from '@components/property_page/ImageSliderBig';
import PropertyDetails from '@components/property_page/PropertyDetails';
import AgentListing from '@components/property_page/AgentListing';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PropertyPage = ({ match }) => {

	const houseId = parseFloat(match.params.house.match(/\d/g).join(''));

	const {

		db,
		buy_properties,
		rent_properties,
		
	} = useContext(FetchContext);

	const {
		
		changePage,
		location
		
	} = useContext(GlobalContext);

	// If no property has been searched we should redirect back to the searching page
	useEffect(() => {

		// if(buy_properties.length === 0 && location.includes('buy')) changePage('/buy-properties');
		// if(rent_properties.length === 0 && location.includes('rental')) changePage('/rental-listings');

	}, []);

	const [property, setProperty] = useState(undefined);

	useEffect(() => {

		// If we filter for some property, the property we will display on the Property Page will be from the same array
		// So no need to check for filtered array, as i did in the SearchListings.js
		// if(location.includes('buy') && buy_properties.length > 0) buy_properties.filter(item => item.id === houseId && setProperty(item));
		// if(location.includes('rent') && rent_properties.length > 0) rent_properties.filter(item => item.id === houseId && setProperty(item));

		// Or i could do this, because i have only 12 properties, so i get all of them when the website is loaded
		// Not recommended if we have a lot more properties
		db.filter(item => item.id === houseId && setProperty(item));

	}, []);

	const defaultSliderState = {
		// This is the image that we display it when we first enter on the page
		// And when we click on the smaller image, display it on the big slider
		shown_image: 0,
		slider_modal_visible: false
	}

	const [slider_state, dispatch] = useReducer(PropertySliderReducer, defaultSliderState);

	const setShownImage = val => dispatch({ type: SET_SHOWN_IMAGE, payload: val });

	const toggleSliderModal = val => {

		dispatch({ type: TOGGLE_SLIDER_MODAL, payload: val });

		// Hide the scroll bar when the Big slider is visible
		val ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden');
	}

	if(property !== undefined) {

		return (
			<main id="property-page">
				<Container className='py-4 px-0'>

				<h1 className='mb-4'>Property Review</h1>

				<Row className='m-0 align-items-start'>
					<Col id='left-side' className='col-lg-8 col-md-12 p-0'>

						<ImageSliderSmall 
							images={property.propertyImages.reviewImages}
							shownImage={slider_state.shown_image}
							transitionTime={500}
							setShownImage={setShownImage}
							toggleSliderModal={toggleSliderModal}
							modal_visible={slider_state.slider_modal_visible}
						/>

						<PropertyDetails info={property} />
						
					</Col>

					<Col id='right-side' className='col-lg-4 col-md-12 p-0'>
						<AgentListing agent={property.listingAgent} />
					</Col>	
				</Row>

				{slider_state.slider_modal_visible && (

					<ImageSliderBig 
						images={property.propertyImages.reviewImages}
						shownImage={slider_state.shown_image}
						transitionTime={700}
						setShownImage={setShownImage}
						toggleSliderModal={toggleSliderModal}
					/>

				)}

				</Container>
			</main>
		)

	} else return null;
}

// Set memo on this component;
export default memo(PropertyPage);
