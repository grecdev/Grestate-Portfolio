import React, { useContext, useEffect, useReducer, useState } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import AuthenticationReducer from '@reducers/AuthenticationReducer';
import {

	HANDLE_ACCOUNT_INPUT

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

	let defaultPlaceholderState = {
		account_first_name: '',
		account_last_name: '',
		account_email: '',
		account_age: '',
		account_address: '',
		account_city: '',
	}

	const [placeholderState, setPlaceholder] = useState(defaultPlaceholderState);
	
	useEffect(() => {

		if(!user_data) changePage('/');
		else {

			if(Object.keys(user_data).length > 0) {
	
				setPlaceholder(prevState => ({
					...prevState,
					account_first_name: user_data.first_name,
					account_last_name: user_data.last_name,
					account_age: user_data.age,
					account_gender: user_data.gender,
					account_email: user_data.email,
					account_address: user_data.address,
					account_city: user_data.city
				}));
			}
		}
		
	}, [user_data]);

	const defaultAccountState = {
		account_first_name: '',
		account_last_name: '',
		account_email: '',
		account_current_password: '',
		account_new_password: '',
		account_age: '',
		account_gender: '',
		account_address: '',
		account_city: ''
	}

	const [state, dispatch] = useReducer(AuthenticationReducer, defaultAccountState);

	const handleChange = e => {

		dispatch({ type: HANDLE_ACCOUNT_INPUT, target: e.target.id.replace(/\-/g, '_'), payload: e.target.value })

		e.stopPropagation();
	}

	const manageUser = e => {

		// if(state.account_current_password.length === 0) return;

		if(e.target.id.includes('update')) {

			console.log('update user');
			updateUser(state);
		}

		if(e.target.id.includes('delete')) deleteUser();


		e.stopPropagation();
	}

	return user_data ? (

		<main id='my-account'>
			<Container className='py-3'>
				<h1 className='text-center'>Personal Information</h1>

				<hr/>

				<Form name='account-form'>
					<Form.Row className='mb-3'>
						<Form.Group as={Col} controlId="account-first-name">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" placeholder={placeholderState.account_first_name} value={state.account_first_name} onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="account-last-name">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text" placeholder={placeholderState.account_last_name} value={state.account_last_name} onChange={handleChange} />
						</Form.Group>
					</Form.Row>

					<Form.Row className='mb-3'>
						<Form.Group as={Col} controlId="account-address">
							<Form.Label>Address</Form.Label>
							<Form.Control type='text' placeholder={placeholderState.account_address} value={state.account_address} onChange={handleChange} />
						</Form.Group>
					</Form.Row>

					<Form.Row className='mb-3'>
						<Form.Group as={Col} controlId="formGridCity">
							<Form.Label>City</Form.Label>
							<Form.Control type='text' placeholder={placeholderState.account_city} value={state.account_city} onChange={handleChange}/>
						</Form.Group>

						<Form.Group as={Col} controlId="account-age" className='mb-4'>
							<Form.Label>Age</Form.Label>
							<Form.Control type='text' placeholder={placeholderState.account_age} value={state.account_age} onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="account-gender" className='mb-4'>
							<Form.Label>Pick your gender</Form.Label>
							<Form.Control as='select' value={state.account_gender} onChange={handleChange} >
								<option value='male'>Male</option>
								<option value='female'>Female</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>

					<Form.Row className='mb-3'>
						<Form.Group as={Col} controlId="account-email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="text" placeholder={placeholderState.account_email} value={state.account_email} onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="account-current-password">
							<Form.Label>Current Password</Form.Label>
							<Form.Control type="password" placeholder="Current Password" value={state.account_current_password} onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="account-new-password">
							<Form.Label>New Password</Form.Label>
							<Form.Control type="password" placeholder="New Password" value={state.account_new_password} onChange={handleChange} />
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
