import React, { useState, useContext, useEffect } from 'react';

import { GlobalContext } from '@context/GlobalContext';
import { FetchContext } from '@context/FetchContext';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const FilterProperties = ({ array }) => {

	const {

		location

	} = useContext(GlobalContext);

	const {

		filterProperty,
		filtered_buy_properties,
		filtered_rent_properties,
		buy_properties,
		rent_properties
 
	} = useContext(FetchContext);

	const default_text = 'Not selected';
	const [text, setText] = useState(default_text);

	const applyFilter = e => {

		let arr = [...array];

		if(e.target.classList.contains('filter-type')) {

			const filter_type = e.target.dataset.filterType;

			setText(e.target.textContent);

			if(filter_type === 'price-ascending') arr = arr.sort((a, b) => {

				if(location.includes('buy')) return parseFloat(a.propertyPrice) - parseFloat(b.propertyPrice);
				if(location.includes('rental')) return parseFloat(a.propertyRent) - parseFloat(b.propertyRent);

			});

			if(filter_type === 'price-descending') arr = arr.sort((a, b) => {

				if(location.includes('buy')) return parseFloat(b.propertyPrice) - parseFloat(a.propertyPrice);
				if(location.includes('rental')) return parseFloat(b.propertyRent) - parseFloat(a.propertyRent);
				
			});

			if(filter_type === 'lot-size-ascending') arr = arr.sort((a, b) => a.propertySize - b.propertySize);
			if(filter_type === 'lot-size-descending') arr = arr.sort((a, b) => b.propertySize - a.propertySize);

			filterProperty(arr, location);
		}
		
		if(e.target.id.includes('reset')) {

			setText(default_text);
			filterProperty([], location);
		}
		
		e.stopPropagation();
	}

	useEffect(() => {

		setText(default_text);
		
	}, [buy_properties, rent_properties]);

	return (
		<div id="filter-properties" className='w-100 mb-4 d-flex justify-content-between align-items-center'>
			
			<p className='font-weight-bold m-0'>{array.length} properties found</p>

			<div className={`d-flex flex-wrap flex-row ${filtered_buy_properties.length > 0 || filtered_rent_properties.length > 0 ? 'justify-content-center' : 'justify-content-end'} align-items-center`}>

				<p className='m-0'>Sort by:</p>

				<DropdownButton id="filter-dropdown" title={text} onClick={applyFilter}>
					<Dropdown.Item as='span' data-filter-type='price-ascending' className='filter-type'>Price (Low to High)</Dropdown.Item>
					<Dropdown.Item as='span' data-filter-type='price-descending' className='filter-type'>Price (High to Low)</Dropdown.Item>
					<Dropdown.Item as='span' data-filter-type='lot-size-ascending' className='filter-type'>Lot Size (Low to High)</Dropdown.Item>
					<Dropdown.Item as='span' data-filter-type='lot-size-descending' className='filter-type'>Lot Size (High to Low)</Dropdown.Item>
				</DropdownButton>

				{filtered_buy_properties.length > 0 || filtered_rent_properties.length > 0 ? <button type='button' id='reset-filters' className='rounded border-0' onClick={applyFilter}>Remove filters</button> : null}
			</div>

		</div>
	)
}

export default FilterProperties;
