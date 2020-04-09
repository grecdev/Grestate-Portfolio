import React, {

	useContext,
	useReducer,
	useEffect

} from 'react';

import PropTypes from 'prop-types';

import { GlobalContext } from '@context/GlobalContext';
import { FetchContext } from '@context/FetchContext';

import PropertyFormReducer from '@reducers/PropertyFormReducer';
import {

	HANDLE_PROPERTY_INPUT,
	RESET_PROPERTY_INPUTS,
	RESET_BUY_INPUTS,
  RESET_RENT_INPUTS

} from '@constants/actionTypes';

import DynamicOptions from './DynamicOptions';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const PropertyForm = ({ buy, rent, multiple }) => {

	const {

		changePage,
		location,
		
	} = useContext(GlobalContext);

	const {

		db,
		searchProperty,
		buy_properties,
		rent_properties
		
	} = useContext(FetchContext);

	const defaultInputState = {
		city_buy: '',
		city_rent: '',
		property_type_buy: '',
		property_type_rent: '',
		buy_budget: '',
		rent_budget: ''
	};

	const [state, dispatch] = useReducer(PropertyFormReducer, defaultInputState);

	const handleChange = e => {

		const target = e.target.id.replace(/\-/g, '_');
		const value = e.target.value;

		dispatch({type: HANDLE_PROPERTY_INPUT, target: target, payload: value });

		e.stopPropagation();
	}
	
	const changeForm = e => {

		const formType = e.target.dataset.formType;

		document.querySelectorAll('.property-search-form form').forEach(form => form.classList.replace('d-block', 'd-none'));

		document.querySelector(`form[name="${formType}"]`).classList.replace('d-none', 'd-block');

		dispatch({type: RESET_PROPERTY_INPUTS, payload: defaultInputState });

		e.stopPropagation();
	}

	const submitForm = e => {

		const formInputs = {
			city: {
				buy: document.body.contains(document.getElementById('city-buy')) && document.getElementById('city-buy').value,
				rent: document.body.contains(document.getElementById('city-rent')) && document.getElementById('city-rent').value
			},
			property_type: {
				buy: document.body.contains(document.getElementById('property-type-buy')) && document.getElementById('property-type-buy').value,
				rent: document.body.contains(document.getElementById('property-type-rent')) && document.getElementById('property-type-rent').value
			},
			budget: {
				buy: document.body.contains(document.getElementById('buy-budget')) && document.getElementById('buy-budget').value,
				rent: document.body.contains(document.getElementById('rent-budget')) && document.getElementById('rent-budget').value
			}
		}

		let submitted = false;
		let arr = db;

		if(e.target.name.includes('buy')) {
			
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
				!location.includes('buy-properties') && changePage('/buy-properties');
				
			} else {

				submitted = false;
			}
		}

		if(e.target.name.includes('rent')) {
			
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

			submitted = true;
			!location.includes('rental-listings') && changePage('/rental-listings');

			if(arr.length > 0) {

				submitted = true;
				!location.includes('rental-listings') && changePage('/rental-listings');
				
			} else {

				submitted = false;
			}
		}

		searchProperty(arr, e.target);
		
		const consoleStyle = 'background: #000; padding: 0.5rem; border: 2px dotted #11FF00';

		console.log(`%cForm has been submitted: ${submitted}`, consoleStyle);
		e.preventDefault();
		e.stopPropagation();
		return submitted;
	}

	// So the inputs remain the same when the page is changed
	useEffect(() => {

		let city, property_type, budget;

		if(buy_properties.length > 0) {

			city = buy_properties[0].addressCity.toLowerCase().replace(/ /g, '-');
			property_type = buy_properties[0].propertyType.toLowerCase().replace(/ /g, '-');
			budget = parseFloat(buy_properties[0].propertyPrice);
		
			Array.from(document.querySelectorAll('#buy-budget option')).forEach(item => {

				const item_value_start = parseFloat(item.value.substring(0, item.value.indexOf('-')).replace(/\,/g, ''));
				const item_value_end = parseFloat(item.value.substring(item.value.indexOf('-') + 1, item.value.length).replace(/\,/g, ''));

				if(item_value_start <= budget && item_value_end >= budget) budget = item.value;
			});

			dispatch({type: HANDLE_PROPERTY_INPUT, target: 'city_buy', payload: city });
			dispatch({type: HANDLE_PROPERTY_INPUT, target: 'property_type_buy', payload: property_type });
			dispatch({type: HANDLE_PROPERTY_INPUT, target: 'buy_budget', payload: budget });
		}

		if(rent_properties.length > 0) {

			city = rent_properties[0].addressCity.toLowerCase().replace(/ /g, '-');
			property_type = rent_properties[0].propertyType.toLowerCase().replace(/ /g, '-');
			budget = parseFloat(rent_properties[0].propertyRent);
		
			Array.from(document.querySelectorAll('#rent-budget option')).forEach(item => {

				const item_value_start = parseFloat(item.value.substring(0, item.value.indexOf('-')).replace(/\,/g, ''));
				const item_value_end = parseFloat(item.value.substring(item.value.indexOf('-') + 1, item.value.length).replace(/\,/g, ''));

				if(item_value_start <= budget && item_value_end >= budget) budget = item.value;
			});

			dispatch({type: HANDLE_PROPERTY_INPUT, target: 'city_rent', payload: city });
			dispatch({type: HANDLE_PROPERTY_INPUT, target: 'property_type_rent', payload: property_type });
			dispatch({type: HANDLE_PROPERTY_INPUT, target: 'rent_budget', payload: budget });
		}

		!location.includes('buy') && dispatch({ type: RESET_BUY_INPUTS });
		!location.includes('rent') && dispatch({ type: RESET_RENT_INPUTS });

	}, [location]);

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
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none' value={state.city_buy} onChange={handleChange}>
									<DynamicOptions type='city' status='buy' />
								</Form.Control>
							</Form.Group>
						</Col>

						<Col className='border-right'>
							<Form.Group controlId='property-type-buy' className='m-0'>
								<Form.Label>Property Type</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none' value={state.property_type_buy} onChange={handleChange}>
									<DynamicOptions type='property-type' status='buy' />
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId='buy-budget' className='m-0'>
								<Form.Label>Budget</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none' value={state.buy_budget} onChange={handleChange}>
									<DynamicOptions type='budget' status='buy' />
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
				<Form className={!location.includes('rental') ? 'py-2 px-3 rounded position-relative d-none' : 'py-2 px-3 rounded position-relative d-block'} name='rent-property' onSubmit={submitForm}>

				{multiple && (
						<Row className="form-header position-absolute">
							<a className='rounded-top' role='button' data-form-type='buy-property' onClick={changeForm}>Buy</a>
							<a className='rounded-top active-form' role='button' data-form-type='rent-property' onClick={changeForm}>Rent</a>
						</Row>
					)}

					<Row className='align-items-center'>
						<Col className='border-right'>
							<Form.Group controlId='city-rent' className='m-0'>
								<Form.Label>City</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none' value={state.city_rent} onChange={handleChange}>
									<DynamicOptions type='city' status='rent'/>
								</Form.Control>
							</Form.Group>
						</Col>

						<Col className='border-right'>
							<Form.Group controlId='property-type-rent' className='m-0'>
								<Form.Label>Property Type</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none' value={state.property_type_rent} onChange={handleChange}>
									<DynamicOptions type='property-type' status='rent'/>
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId='rent-budget' className='m-0'>
								<Form.Label>Rent per month</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none' value={state.rent_budget} onChange={handleChange}>
									<DynamicOptions type='budget' status='rent'/>
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
