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

	const DynamicOptions = ({ type }) => {

		if (type === 'city') {

			const cities = db.map(property => property.addressCity);

			const removedDuplicates = cities.filter((duplicate, index) => cities.indexOf(duplicate) === index);

			return removedDuplicates.map(city => {

				const formattedValue = city.replace(/ /g, '-').toLowerCase();

				return <option key={uuidv4()} value={formattedValue}>{city}</option>
			});
		}

		if (type === 'property-type') {

			// Capitalized
			const propertyType = db.map(property => property.propertyType.substring(0, 1).toUpperCase() + property.propertyType.substring(1));

			const removedDuplicates = propertyType.filter((duplicate, index) => propertyType.indexOf(duplicate) === index);

			return removedDuplicates.map(propertyType => {

				const formattedValue = propertyType.replace(/ /g, '-').toLowerCase();

				return <option key={uuidv4()} value={formattedValue}>{propertyType}</option>
			});
		}

		if (type === 'budget-sell') {

			const propertiesForSell = db.filter(property => property.propertyPrice !== undefined);
			const price = propertiesForSell.map(price => parseFloat(price.propertyPrice)).sort((a, b) => a - b);

			const removedDuplicates = price.filter((duplicates, index) => price.indexOf(duplicates) === index);

			const formattedPrice = removedDuplicates.map(price => {

				let formattedPrice;

				if (price >= 50000 && price <= 100000) formattedPrice = '$50,000 - $100,000';

				if (price >= 100000 && price <= 300000) formattedPrice = '$100,000 - $300,000';

				if (price >= 300000 && price <= 500000) formattedPrice = '$300,000 - $500,000';

				if (price >= 500000 && price <= 700000) formattedPrice = '$500,000 - $700,000';

				if (price >= 700000 && price <= 1000000) formattedPrice = '$700,000 - $1,000,000';

				return formattedPrice;
			});

			const uniqueFormattedPrice = formattedPrice.filter((duplicates, index) => formattedPrice.indexOf(duplicates) === index);

			return uniqueFormattedPrice.map(price => <option key={uuidv4()} value={price.replace(/[\$ ]/g, '')}>{price}</option>);
		}

		if (type === 'budget-rent') {

			const propertiesForRent = db.filter(property => property.propertyRent !== undefined);
			const price = propertiesForRent.map(price => parseFloat(price.propertyRent)).sort((a, b) => a - b);

			return price.filter((duplicates, index) => price.indexOf(duplicates) === index).map(price => {

				return <option key={uuidv4()} value={price}>{'$' + price.toLocaleString()}</option>
			});
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

			// console.log(formInputs);
			
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
									{db !== undefined && <DynamicOptions type='city' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col className='border-right'>
							<Form.Group controlId='property-type-buy' className='m-0'>
								<Form.Label>Property Type</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='property-type' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId='buy-budget' className='m-0'>
								<Form.Label>Budget</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='budget-sell' />}
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
									{db !== undefined && <DynamicOptions type='city' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col className='border-right'>
							<Form.Group controlId='property-type-rent' className='m-0'>
								<Form.Label>Property Type</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='property-type' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId='rent-budget' className='m-0'>
								<Form.Label>Rent per month</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{db !== undefined && <DynamicOptions type='budget-rent' />}
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
