import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FetchContext } from '../../../context/FetchContext';

import { v4 as uuidv4 } from 'uuid';

const DynamicOptions = (props) => {

	const { db } = useContext(FetchContext);

	const {

		type,
		status

	} = props;
	
	let removedDuplicates;

	if (type === 'city') {

		let cities;

		if(status === 'buy') cities = db.map(item => { if(item.propertyStatus === 'buy') return item.addressCity });

		if(status === 'rent') cities = db.map(item => { if(item.propertyStatus === 'rent') return item.addressCity });

		removedDuplicates = cities.filter((duplicate, index) => cities.indexOf(duplicate) === index && duplicate !== undefined);

		return removedDuplicates.map(city => {

			const formattedValue = city.replace(/ /g, '-').toLowerCase();

			return <option key={uuidv4()} value={formattedValue}>{city}</option>
		});
	}

	if (type === 'property-type') {

		let propertyType;

		if(status === 'buy') {

			// Capitalized
			propertyType = db.map(item => {

				if(item.propertyStatus === 'buy') return item.propertyType.substring(0, 1).toUpperCase() + item.propertyType.substring(1);
			});
		}

		if(status === 'rent') {

			// Capitalized
			propertyType = db.map(item => {

				if(item.propertyStatus === 'rent') return item.propertyType.substring(0, 1).toUpperCase() + item.propertyType.substring(1);
			});
		}

		removedDuplicates = propertyType.filter((duplicate, index) => propertyType.indexOf(duplicate) === index && duplicate !== undefined);

		return removedDuplicates.map(propertyType => {

		const formattedValue = propertyType.replace(/ /g, '-').toLowerCase();

			return <option key={uuidv4()} value={formattedValue}>{propertyType}</option>
		});
	}

	if (type === 'budget') {

		let propertyStatus, priceRange, formattedPrice, uniqueFormattedPrice;

		if(status === 'buy') {

			propertyStatus = db.filter(item => item.propertyStatus === 'buy');
			priceRange = propertyStatus.map(price => parseFloat(price.propertyPrice)).sort((a, b) => a - b);

			removedDuplicates = priceRange.filter((duplicates, index) => priceRange.indexOf(duplicates) === index);

			formattedPrice = removedDuplicates.map(price => {

				let formattedPrice;

				if (price >= 100000 && price <= 150000) formattedPrice = '$100,000 - $150,000';

				if (price >= 200000 && price <= 250000) formattedPrice = '$200,000 - $250,000';

				return formattedPrice;
			});
		}

		if(status === 'rent') {
			
			propertyStatus = db.filter(item => item.propertyStatus === 'rent');
			priceRange = propertyStatus.map(price => parseFloat(price.propertyRent)).sort((a, b) => a - b);

			removedDuplicates = priceRange.filter((duplicates, index) => priceRange.indexOf(duplicates) === index);

			formattedPrice = removedDuplicates.map(price => {

				let formattedPrice;

				if (price >= 200 && price <= 500) formattedPrice = '$200 - $500';

				if (price >= 500 && price <= 1000) formattedPrice = '$500 - $1000';

				return formattedPrice;
			});
		}

		uniqueFormattedPrice = formattedPrice.filter((duplicates, index) => formattedPrice.indexOf(duplicates) === index);

		return uniqueFormattedPrice.map(price => <option key={uuidv4()} value={price.replace(/[\$ ]/g, '')}>{price}</option>);
	}
}

DynamicOptions.propTypes = {
	type: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired
}

export default DynamicOptions;