import React, { useState, useContext } from 'react';

import { GlobalContext } from '@context/GlobalContext';
import { FetchContext } from '@context/FetchContext';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const FilterProperties = ({ array }) => {

	const {

		location

	} = useContext(GlobalContext);

	const {

		filterProperty
 
	} = useContext(FetchContext);

	const [title, setTitle] = useState('Not selected');

	const applyFilter = e => {

		let arr = [...array];

		if(e.target.classList.contains('filter-type')) {

			const filter_type = e.target.dataset.filterType;

			setTitle(e.target.textContent);

			if(filter_type === 'price-ascending') arr = arr.sort((a, b) => {

				if(location.includes('buy')) return parseFloat(a.propertyPrice) - parseFloat(b.propertyPrice);
				if(location.includes('rental')) return parseFloat(a.propertyRent) - parseFloat(b.propertyRent);

			});

			if(filter_type === 'price-descending') arr = arr.sort((a, b) => {

				if(location.includes('buy')) return parseFloat(b.propertyPrice) - parseFloat(a.propertyPrice);
				if(location.includes('rental')) return parseFloat(b.propertyRent) - parseFloat(a.propertyRent);
				
			});

			filterProperty(arr, location);
		}
		
		if(e.target.id.includes('reset')) {

			setTitle('Not selected');
			filterProperty([], location);
		}
		
		e.stopPropagation();
	}

	return (
		<div id="filter-properties" className='w-100 mb-5 d-flex justify-content-between align-items-center'>
			
			<p className='font-weight-bold m-0'>{array.length} properties found</p>

			<div className='d-flex flex-row justify-content-end align-items-center'>

				<p className='m-0'>Sort by:</p>

				<DropdownButton id="filter-dropdown" title={title} onClick={applyFilter}>
					<Dropdown.Item as='span' data-filter-type='price-ascending' className='filter-type'>Price (Low to High)</Dropdown.Item>
					<Dropdown.Item as='span' data-filter-type='price-descending' className='filter-type'>Price (High to Low)</Dropdown.Item>
					<Dropdown.Item as='span' data-filter-type='lot-size-ascending' className='filter-type'>Lot Size (Low to High)</Dropdown.Item>
					<Dropdown.Item as='span' data-filter-type='lot-size-descending' className='filter-type'>Lot Size (High to Low)</Dropdown.Item>
				</DropdownButton>

				<button type='button' id='reset-filters' className='rounded border-0' onClick={applyFilter}>Remove filters</button>
			</div>

		</div>
	)
}

export default FilterProperties;
