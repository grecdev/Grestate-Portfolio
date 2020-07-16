import React, {
  useEffect,
  useContext,
  useState,
  useReducer,
  memo,
} from 'react';

import { FetchContext } from '@context/FetchContext';
import { GlobalContext } from '@context/GlobalContext';

import PropertySliderReducer from '@reducers/PropertySliderReducer';

import { SET_SHOWN_IMAGE, TOGGLE_SLIDER_MODAL } from '@constants/actionTypes';

import ImageSliderSmall from '@components/property_page/ImageSliderSmall';
import ImageSliderBig from '@components/property_page/ImageSliderBig';
import PropertyDetails from '@components/property_page/PropertyDetails';
import AgentListing from '@components/property_page/AgentListing';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PropertyPage = ({ match }) => {
  const houseId =
    match.params.house.includes('house') &&
    parseFloat(match.params.house.match(/\d/g).join(''));

  const { changePage, location } = useContext(GlobalContext);
  const { db } = useContext(FetchContext);

  const [property, setProperty] = useState(undefined);

  useEffect(() => {
    // If fails to fetch from database and is on the property page then redirect to the search page
    if (db.length === 0) {
      location.includes('buy') && changePage('/buy-properties');
      location.includes('rent') && changePage('/rental-listings');

      // If not get the property
    } else db.filter((item) => item.id === houseId && setProperty(item));
  }, []);

  const defaultSliderState = {
    // This is the image that we display it when we first enter on the page
    // And when we click on the smaller image, display it on the big slider
    shown_image: 0,
    slider_modal_visible: false,
  };

  const [slider_state, dispatch] = useReducer(
    PropertySliderReducer,
    defaultSliderState,
  );

  const setShownImage = (val) =>
    dispatch({ type: SET_SHOWN_IMAGE, payload: val });

  const toggleSliderModal = (val) => {
    dispatch({ type: TOGGLE_SLIDER_MODAL, payload: val });

    // Hide the scroll bar when the Big slider is visible
    val
      ? document.body.classList.add('overflow-hidden')
      : document.body.classList.remove('overflow-hidden');
  };

  if (property !== undefined) {
    return (
      <main id='property-page'>
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
    );
  } else return null;
};

// Set memo on this component;
export default memo(PropertyPage);
