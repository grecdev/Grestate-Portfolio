import React, { useContext, useEffect, useReducer } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import AuthenticationReducer from '@reducers/AuthenticationReducer';
import {

	HANDLE_ACCOUNT_INPUT,
	SET_ACCOUNT_INPUTS

} from '@constants/actionTypes';

import AuthLoader from '@components/authentication/AuthLoader';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const MyAccountPage = () => {

	const {

		user_data,
		deleteUser,
		updateUser,
		auth_loader

	} = useContext(AuthenticationContext);

	const {

		changePage

	} = useContext(GlobalContext);

	const defaultAccountState = {
		first_name: '',
		last_name: '',
		address: '',
		city: '',
		age: '',
		gender: '',
		email: '',
		current_password: '',
		new_password: ''
	}

	const [state, dispatch] = useReducer(AuthenticationReducer, defaultAccountState);

	const handleChange = e => {

		// Remove the `account-` string from id and replace `-` with `_`
		// To match the key from state
		const target = e.target.id.substring(e.target.id.indexOf('-') + 1).replace(/\-/g, '_');

		dispatch({ type: HANDLE_ACCOUNT_INPUT, target, payload: e.target.value });

		e.stopPropagation();
	}

	const manageUser = e => {

		if(e.target.id.includes('update')) {

			console.log('update user');

			updateUser(state);
		}

		if(e.target.id.includes('delete')) deleteUser();

		e.stopPropagation();
	}

	useEffect(() => {

		if(!user_data) changePage('/');
		else {

			// When the data fetch is completed get the user data and set it on the inputs
			// Depends on the firebase servers
			if(Object.keys(user_data).length > 0) dispatch({ type: SET_ACCOUNT_INPUTS, payload: user_data });
		}		
		
	}, [user_data]);

	return user_data ? (

		<main id='my-account'>
			<Container className='py-3'>
				<h1 className='text-center'>Personal Information</h1>
				<h6 className='m-0 text-center text-secondary font-italic'>Joined on {user_data.date_joined}</h6>

				<hr/>

				<Form name='account-form'>
					<Form.Row className='mb-3'>
						<Form.Group as={Col} controlId="account-last-name">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text" value={state.last_name} onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="account-first-name">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" value={state.first_name} onChange={handleChange} />
						</Form.Group>
					</Form.Row>

					<Form.Row className='mb-3'>
						<Form.Group as={Col} controlId="account-address">
							<Form.Label>Address</Form.Label>
							<Form.Control type='text' value={state.address} onChange={handleChange} />
						</Form.Group>
					</Form.Row>

					<Form.Row className='mb-3'>
						<Form.Group as={Col} controlId="account-city">
							<Form.Label>City</Form.Label>
							<Form.Control type='text' value={state.city} onChange={handleChange}/>
						</Form.Group>

						<Form.Group as={Col} controlId="account-age" className='mb-4'>
							<Form.Label>Age</Form.Label>
							<Form.Control type='text' value={state.age} onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="account-gender" className='mb-4'>
							<Form.Label>Pick your gender</Form.Label>
							<Form.Control as='select' value={state.gender} onChange={handleChange} >
								<option value='male'>Male</option>
								<option value='female'>Female</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>

					<Form.Row className='mb-3'>
						<Form.Group as={Col} controlId="account-email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="text" value={state.email} onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="account-current-password">
							<Form.Label>Current Password</Form.Label>
							<Form.Control type="password" value={state.current_password} onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="account-new-password">
							<Form.Label>New Password</Form.Label>
							<Form.Control type="password" value={state.new_password} onChange={handleChange} />
						</Form.Group>
					</Form.Row>

					<Form.Row className='justify-content-center'>
						{ auth_loader ? <AuthLoader /> : (
							<>
								<button 
								id='update-account'
								className='btn btn-dark w-25 px-3 py-2 mx-3' 
								type='button'
								onClick={manageUser}
								>
									Update account
							</button>

								<button 
									id='delete-account'
									className='btn btn-danger w-25 px-3 py-2 mx-3' 
									type='button'
									onClick={manageUser}
									>
										Delete account
								</button>
							</>
						)}
					</Form.Row>
				</Form>
			</Container>
		</main>

	) : null
}

export default MyAccountPage
