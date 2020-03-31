import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { GlobalContext } from '../../../context/GlobalContext';
import { FetchContext } from '../../../context/FetchContext';

const PropertyBox = () => {

	const {

		changePage,
		getImage,
		location

	} = useContext(GlobalContext);

	const {

		filtered_buy_properties,
		filtered_rent_properties

	} = useContext(FetchContext);

	const test = e => {
		
		const propertyId = e.currentTarget.dataset.propertyId;

		changePage(`/buy-properties/house-${propertyId}`);

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

	const [arr, setArr] = useState([]);

	useEffect(() => {

		location.includes('buy-properties') && setArr(filtered_buy_properties);
		location.includes('rental-listings') && setArr(filtered_rent_properties);

	}, [filtered_buy_properties, filtered_rent_properties]);

	if(arr.length === 0) {
	
		return (
			<div className="search-not-found text-center">
				<p className='h1'>No property found, please try again.</p>
				<img className='mx-auto' src={getImage('property-not-found.png')} alt='property not found' />
			</div>
		)
	}

	if(arr.length > 0) {

		let price;

		return arr.map((item, index) => {
			
			if(item.propertyStatus === 'buy') price = item.propertyPrice
			if(item.propertyStatus === 'rent') price = item.propertyRent

			return (
	
				<div
					key={uuidv4()}
					className="property-box mx-3"
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
	}
};

export default PropertyBox;
