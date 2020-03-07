import React, { useEffect, useReducer, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import {

	GET_DATABASE

} from '../../constants/actionTypes';

import FormReducer from '../../reducers/FormReducer';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const PropertyForm = () => {

	const [database, dispatch] = useReducer(FormReducer, []);

	const defaultFormTypeState = {
		buy: true,
		rent: false
	}

	const [formType, setFormType] = useState(defaultFormTypeState);

	const changeForm = e => {

		const formType = e.target.dataset.formType;

		formType === 'buy' && setFormType(prevState => ({ ...prevState, buy: true, rent: false }));
		formType === 'rent' && setFormType(prevState => ({ ...prevState, buy: false, rent: true }));

		e.stopPropagation();
	}

	const DynamicOptions = ({ type }) => {

		if (type === 'city') {

			const cities = database.properties.map(property => property.addressCity);

			const removedDuplicates = cities.filter((duplicate, index) => cities.indexOf(duplicate) === index);

			return removedDuplicates.map(city => {

				const formattedValue = city.replace(/ /g, '-').toLowerCase();

				return <option key={uuidv4()} value={formattedValue}>{city}</option>
			});
		}

		if (type === 'property-type') {

			// Capitalized
			const propertyType = database.properties.map(property => property.propertyType.substring(0, 1).toUpperCase() + property.propertyType.substring(1));

			const removedDuplicates = propertyType.filter((duplicate, index) => propertyType.indexOf(duplicate) === index);

			return removedDuplicates.map(propertyType => {

				const formattedValue = propertyType.replace(/ /g, '-').toLowerCase();

				return <option key={uuidv4()} value={formattedValue}>{propertyType}</option>
			});
		}

		if (type === 'budget-sell') {

			const propertiesForSell = database.properties.filter(property => property.propertyPrice !== undefined);
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

			const propertiesForRent = database.properties.filter(property => property.propertyRent !== undefined);
			const price = propertiesForRent.map(price => parseFloat(price.propertyRent)).sort((a, b) => a - b);

			return price.filter((duplicates, index) => price.indexOf(duplicates) === index).map(price => {

				return <option key={uuidv4()} value={price}>{'$' + price.toLocaleString()}</option>
			});

			// const uniqueFormattedPrice = formattedPrice.filter((duplicates, index) => formattedPrice.indexOf(duplicates) === index);

			// return uniqueFormattedPrice.map(price => <option key={uuidv4()} value={price.replace(/[\$ ]/g, '')}>{price}</option>);

			return null;
		}
	}

	const getXhr = () => {

		return new Promise((resolve, reject) => {

			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'https://grecdev.github.io/json-api/properties.json', true);

			xhr.onload = () => {

				const response = JSON.parse(xhr.responseText);

				xhr.status >= 400 ? reject(response) : resolve(response);

			}

			xhr.onerror = () => reject('Some error occurred');

			xhr.send();

		});
	}

	const getFetch = () => {

		return new Promise((resolve, reject) => {

			fetch('https://grecdev.github.io/json-api/properties.json')
				.then(errorHandling)
				.then(data => resolve(data))
				.catch(err => reject(err))

			function errorHandling(response) {

				if (!response.ok) throw Error(response.statusText)

				return response.json();
			}
		});
	}

	const getAjax = async () => {

		const response = await fetch('https://grecdev.github.io/json-api/properties.json');
		const data = await response.json();

		return data;
	}

	useEffect(() => {

		getXhr()
			.then(data => dispatch({ type: GET_DATABASE, payload: data }))
			.catch(err => console.log(err));

	}, []);

	return (
		<div className='property-search-form'>
			{formType.buy && (
				<Form className='py-2 px-3 rounded position-relative' name='buy-property'>

					<Row className="form-header position-absolute">
						<a className='rounded-top active-form' role='button' data-form-type='buy' onClick={changeForm}>Buy</a>
						<a className='rounded-top' role='button' data-form-type='rent' onClick={changeForm}>Rent</a>
					</Row>

					<Row className='align-items-center'>
						<Col className='border-right'>
							<Form.Group controlId='city-input' className='m-0'>
								<Form.Label>City</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{database.properties !== undefined && <DynamicOptions type='city' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col className='border-right'>
							<Form.Group controlId='city-input' className='m-0'>
								<Form.Label>Property Type</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{database.properties !== undefined && <DynamicOptions type='property-type' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId='city-input' className='m-0'>
								<Form.Label>Budget</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{database.properties !== undefined && <DynamicOptions type='budget-sell' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Button type='submit' className='shadow-none border-0' block>Search</Button>
						</Col>
					</Row>
				</Form>
			)}

			{formType.rent && (
				<Form className='py-2 px-3 rounded position-relative' name='rent-property'>

					<Row className="form-header position-absolute">
						<a className='rounded-top' role='button' data-form-type='buy' onClick={changeForm}>Buy</a>
						<a className='rounded-top active-form' role='button' data-form-type='rent' onClick={changeForm}>Rent</a>
					</Row>

					<Row className='align-items-center'>
						<Col className='border-right'>
							<Form.Group controlId='city-input' className='m-0'>
								<Form.Label>City</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{database.properties !== undefined && <DynamicOptions type='city' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col className='border-right'>
							<Form.Group controlId='city-input' className='m-0'>
								<Form.Label>Property Type</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{database.properties !== undefined && <DynamicOptions type='property-type' />}
								</Form.Control>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId='city-input' className='m-0'>
								<Form.Label>Rent per month</Form.Label>
								<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
									{database.properties !== undefined && <DynamicOptions type='budget-rent' />}
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

export default PropertyForm;
