import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { GlobalContext } from '../../../context/GlobalContext';
import { FetchContext } from '../../../context/FetchContext';

const PropertyBox = () => {

	const {

		changePage,
		getImage

	} = useContext(GlobalContext);

	const { filtered_db } = useContext(FetchContext);

	const test = e => {
		
		const propertyId = e.currentTarget.dataset.propertyId;

		changePage(`/buy-homes/house-${propertyId}`);

		e.stopPropagation();
	}

	if(filtered_db.length === 0) {
	
		return (
			<div className="search-not-found text-center">
				<p className='h1'>No property found, please try again.</p>
				<img className='mx-auto' src={getImage('property-not-found.png')} alt='property not found' />
			</div>
		)
	}

	if(filtered_db.length > 0) {

		return filtered_db.map(item => (
	
			<div key={uuidv4()} className="property-box mx-3" data-property-id={item.id} onClick={test} >
				<img src={getImage(item.propertyImages.showcaseImage)} className='rounded'/>

				<div className="property-box-info pt-3">
					<p className='font-weight-bold m-0'>{item.addressLocation}</p>
					<p className='text-black-50 mb-1'>{item.addressCity}</p>

					<p className='price font-weight-bold'>${parseFloat(item.propertyPrice).toLocaleString()}</p>
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

		));
	}
};

export default PropertyBox;
