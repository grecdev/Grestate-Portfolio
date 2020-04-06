import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { GlobalContext } from '@context/GlobalContext';

const PropertyBox = ({ array }) => {

	const {

		changePage,
		getImage,
		location

	} = useContext(GlobalContext);

	const test = e => {
		
		const propertyId = e.currentTarget.dataset.propertyId;

		location.includes('buy') && changePage(`/buy-properties/house-${propertyId}`);
		location.includes('rent') && changePage(`/rental-listings/house-${propertyId}`);

		e.stopPropagation();
	}

	const hightlightPin = e => {

		const pinIndex = e.currentTarget.dataset.pinIndex;

		const pinImage = document.querySelectorAll('.marker-image')[pinIndex];

		if(location.includes('buy')) {
			
			e.type === 'mouseenter' && pinImage.setAttribute('src', getImage('hightlight-pin-1.svg'));
			e.type === 'mouseleave' && pinImage.setAttribute('src', getImage('pin-1.svg'));
		}

		if(location.includes('rent')) {

			e.type === 'mouseenter' && pinImage.setAttribute('src', getImage('hightlight-pin-2.svg'));
			e.type === 'mouseleave' && pinImage.setAttribute('src', getImage('pin-2.svg'));
		}
		
		e.stopPropagation();
	}

	let price;

	return array.map((item, index) => {
		
		if(item.propertyStatus === 'buy') price = item.propertyPrice
		if(item.propertyStatus === 'rent') price = item.propertyRent

		return (

			<div
				key={uuidv4()}
				className="property-box"
				data-property-id={item.id}
				data-pin-index={index}
				onMouseEnter={hightlightPin}
				onMouseLeave={hightlightPin}
				onClick={test}
			>
				<img src={getImage(item.propertyImages.showcaseImage)} className='rounded'/>

				<div className="property-box-info pt-3">
					<p className='font-weight-bold m-0'>{item.addressLocation}</p>
					<p className='text-black-50 mb-1'>{item.addressCity}</p>

					<p className='price font-weight-bold'>${parseFloat(price).toLocaleString()}</p>
				</div>

				<div className="features-preview d-flex flex-row justify-content-start align-items-center">
					<div className='position-relative'>
						<p className='pr-3'><i className="fas fa-bed mr-1"></i> {item.bedrooms}</p>
						<div className='d-none p-2 text-center position-absolute pop-up'>Bedrooms</div>
					</div>

					<div className='position-relative'>
						<p className='pr-3'><i className="fas fa-bath mr-1"></i> {item.bathrooms}</p>
						<div className='d-none p-2 text-center position-absolute pop-up'>Bathrooms</div>
					</div>

					<div className='position-relative'>
						<p className='pr-3'><i className="fas fa-ruler-combined mr-1"></i> {item.propertySize}</p>
						<div className='d-none p-2 text-center position-absolute pop-up'>Property Size</div>
					</div>
				</div>
			</div>

		)
	});
};

PropertyBox.propTypes = {
	array: PropTypes.array.isRequired
}

export default PropertyBox;
