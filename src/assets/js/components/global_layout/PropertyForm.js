import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const PropertyForm = () => {
	return (
		<div className='property-search-form'>
			<Form className='py-2 px-3 rounded' name='property-form'>
				<Row className='align-items-center'>
					<Col className='border-right'>
						<Form.Group controlId='city-input' className='m-0'>
							<Form.Label>City</Form.Label>
							<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
								<option defaultValue='san-francisco'>San Francisco</option>
								<option defaultValue='new-york'>New York</option>
								<option defaultValue='los-angeles'>Los Angeles</option>
								<option defaultValue='boston'>Boston</option>
							</Form.Control>
						</Form.Group>
					</Col>

					<Col className='border-right'>
						<Form.Group controlId='city-input' className='m-0'>
							<Form.Label>Property Type</Form.Label>
							<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
								<option defaultValue='house'>House</option>
								<option defaultValue='cottage'>Cottage</option>
								<option defaultValue='residential'>Residential</option>
								<option defaultValue='vacant-land'>Vacant Land</option>
								<option defaultValue='townhomes'>Townhomes</option>
								<option defaultValue='country'>Country</option>
								<option defaultValue='bungalow'>Bungalow</option>
								<option defaultValue='villa'>Villa</option>
								<option defaultValue='duplex'>Duplex</option>
							</Form.Control>
						</Form.Group>
					</Col>

					<Col>
						<Form.Group controlId='city-input' className='m-0'>
							<Form.Label>Budget</Form.Label>
							<Form.Control as='select' className='border-0 bg-white input-field shadow-none'>
								<option defaultValue='50.000-100.000'>$50.000 - $100.000</option>
								<option defaultValue='100.000-150.000'>$100.000 - $150.000</option>
								<option defaultValue='150.000-200.000'>$150.000 - $200.000</option>
								<option defaultValue='200.000-250.000'>$200.000 - $250.000</option>
							</Form.Control>
						</Form.Group>
					</Col>

					<Col>
						<Button type='submit' className='shadow-none border-0' block>Search</Button>
					</Col>
				</Row>
			</Form>
		</div>
	)
}

export default PropertyForm;
