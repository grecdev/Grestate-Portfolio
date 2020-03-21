import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '../../context/GlobalContext';

import { v4 as uuidv4 } from 'uuid';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const PropertyForm = ({buy, rent, multiple}) => {

	const {
		db,
		changePage
	} = useContext(GlobalContext);
	
	const changeForm = e => {

		const formType = e.target.dataset.formType;

		document.querySelectorAll('.property-search-form form').forEach(form => form.classList.replace('d-block', 'd-none'));

		document.querySelector(`form[name="${formType}"]`).classList.replace('d-none', 'd-block');

		e.stopPropagation();
	}

	const DynamicOptions = ({ type, status }) => {

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

			// const propertiesForRent = db.filter(property => property.propertyRent !== undefined);
			// const price = propertiesForRent.map(price => parseFloat(price.propertyRent)).sort((a, b) => a - b);

			// return price.filter((duplicates, index) => price.indexOf(duplicates) === index).map(price => {

			// 	return <option key={uuidv4()} value={price}>{'$' + price.toLocaleString()}</option>
			// });

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

	const submitForm = e => {

		const formInputs = {
			city: {
				buy: document.getElementById('city-buy').value,
				rent: document.getElementById('city-rent').value
			},
			property_type: {
				buy: document.getElementById('property-type-buy').value,
				rent: document.getElementById('property-type-rent').value
			},
			budget: {
				buy: document.getElementById('buy-budget').value,
				rent: document.getElementById('rent-budget').value
			}
		}

		let submitted = false;

		if(e.target.name.includes('buy')) {
			
			let arr = [...db];
			
			// Status
			arr = arr.filter(item => item.propertyStatus === 'buy' );

			// Location
			arr = arr.filter(item => {

				let regex = formInputs.city.buy.replace('-', ' ');
				regex = new RegExp(`[${regex}]`, 'gi');
				return item.addressCity === item.addressCity.match(regex).join('');
			});

			// Property Type
			arr = arr.filter(item => {

				let regex = formInputs.property_type.buy.replace('-', ' ');
				regex = new RegExp(`^${regex}$`, `gi`);

				if(item.propertyType.match(regex) !== null) regex = item.propertyType.match(regex).join('');

				return item.propertyType === regex;
			});

			// Budget
			arr = arr.filter(item => {

				let startPrice = parseFloat(formInputs.budget.buy.substring(0, formInputs.budget.buy.indexOf('-')).replace(',', ''));
				let endPrice = parseFloat(formInputs.budget.buy.substring(formInputs.budget.buy.indexOf('-') + 1, formInputs.budget.buy.length).replace(',', ''));

				return parseFloat(item.propertyPrice) >= startPrice && parseFloat(item.propertyPrice) <= endPrice;
			});

			if(arr.length > 0) {

				submitted = true;
				changePage('/buy');

			} else {

				submitted = false;
			}

			console.log(arr);
		}

		if(e.target.name.includes('rent')) {

			let arr = [...db];
			
			// Status
			arr = arr.filter(item => item.propertyStatus === 'rent' );

			// Location
			arr = arr.filter(item => {

				let regex = formInputs.city.rent.replace('-', ' ');
				regex = new RegExp(`[${regex}]`, 'gi');
				return item.addressCity === item.addressCity.match(regex).join('');
			});

			// Property Type
			arr = arr.filter(item => {

				let regex = formInputs.property_type.rent.replace('-', ' ');
				regex = new RegExp(`^${regex}$`, `gi`);

				if(item.propertyType.match(regex) !== null) regex = item.propertyType.match(regex).join('');

				return item.propertyType === regex;
			});

			// Budget
			arr = arr.filter(item => {

				let startPrice = parseFloat(formInputs.budget.rent.substring(0, formInputs.budget.rent.indexOf('-')).replace('-', ''));
				let endPrice = parseFloat(formInputs.budget.rent.substring(formInputs.budget.rent.indexOf('-') + 1, formInputs.budget.rent.length).replace('-', ''));

				return parseFloat(item.propertyRent) >= startPrice && parseFloat(item.propertyRent) <= endPrice;
			});

			if(arr.length > 0) {

				submitted = true;
				changePage('/rent');

			} else {

				submitted = false;
			}
		}

		const consoleStyle = 'background: #000; padding: 0.5rem; border: 2px dotted #11FF00';

		console.log(`%cForm has been submitted: ${submitted}`, consoleStyle);
		e.preventDefault();
		e.stopPropagation();
		return submitted;
	}

	return (
		<div className='property-search-form'>
			{buy && (
				<Form className='py-2 px-3 rounded position-relative d-block' name='buy-property' onSubmit={submitForm}>

					{multiple && (
						<Row className="form-header position-absolute">
							<a className='rounded-top active-form' role='button' data-form-type='buy-property' onClick={changeForm}>Buy</a>
							<a className='rounded-top' role='button' data-form-type='rent-property' onClick={changeForm}>Rent</a>
						</Row>
					)}

					<Row className='align-items-center'>
						<Col className='border-right'>
							<Form.Group controlId='city-buy' className='m-0'>
								<Form.Label>City</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='city' status='buy' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col className='border-right'>
							<Form.Group controlId='property-type-buy' className='m-0'>
								<Form.Label>Property Type</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='property-type' status='buy' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId='buy-budget' className='m-0'>
								<Form.Label>Budget</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='budget' status='buy' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Button type='submit' className='shadow-none border-0' block>Search</Button>
						</Col>
					</Row>
				</Form>
			)}

			{rent && (
				<Form className='py-2 px-3 rounded position-relative d-none' name='rent-property' onSubmit={submitForm}>

					<Row className="form-header position-absolute">
						<a className='rounded-top' role='button' data-form-type='buy-property' onClick={changeForm}>Buy</a>
						<a className='rounded-top active-form' role='button' data-form-type='rent-property' onClick={changeForm}>Rent</a>
					</Row>

					<Row className='align-items-center'>
						<Col className='border-right'>
							<Form.Group controlId='city-rent' className='m-0'>
								<Form.Label>City</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='city' status='rent'/>}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col className='border-right'>
							<Form.Group controlId='property-type-rent' className='m-0'>
								<Form.Label>Property Type</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='property-type' status='rent'/>}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId='rent-budget' className='m-0'>
								<Form.Label>Rent per month</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='budget' status='rent'/>}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Button type='submit' className='shadow-none border-0' block>Search</Button>
						</Col>
					</Row>
				</Form>
				
			)}
		</div>
	)
}

PropertyForm.propTypes = {
	multiple: PropTypes.bool.isRequired,
	buy: PropTypes.bool.isRequired,
	rent: PropTypes.bool.isRequired
}

export default PropertyForm;
