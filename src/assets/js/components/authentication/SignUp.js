import React, { useContext, useReducer, useState } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import AuthenticationReducer from '@reducers/AuthenticationReducer';
import {

	HANDLE_SIGNUP_INPUT

} from '@constants/actionTypes';

import RegexAlert from '@components/global_layout/RegexAlert';
import AuthLoader from './AuthLoader';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SignUp = () => {

	const {

		socialAuthentication,
		signUpAuth,
		auth_loader

	} = useContext(AuthenticationContext);

	const {

		getImage,
		disableLetters

	} = useContext(GlobalContext);

	const defaultSignupState = {
		first_name: 'Alexandru',
		last_name: 'Grecu',
		age: '21',
		gender: 'Pick your gender',
		city: 'Bucharest',
		address: 'Rahova',
		email: 'user@gmail.com',
		password: '123456',
		confirm_password: '123456',
	};

	const [signup_state, dispatch] = useReducer(AuthenticationReducer, defaultSignupState);

	const signUp = e => {

		e.stopPropagation();
		e.preventDefault();

		signUpAuth(signup_state);
	}

	const handleChange = e => {

		// Remove the `signup-` string from id and replace `-` with `_`
		// To match the key from signup_state
		const target = e.target.id.substring(e.target.id.indexOf('-') + 1).replace(/\-/g, '_');

		dispatch({ type: HANDLE_SIGNUP_INPUT, target, payload: e.target.value });
		
		e.stopPropagation();
	}

	const [signup_regex, setSignupRegex] = useState({
		alert_message: '',
		input: {}
	})

	const signupValidation = e => {

		const {

			id,
			placeholder,
			value

		} = e.target;

		const target = id.replace(/\-/g, '_');

		const regex = {
			name: /^[aA-zZ \-]{3,}$/g,
		}

		if(id.includes('first-name')) {

			// if(!value.match(regex.name)) {

			// 	/*
			// 		I did this because when i have multiple inputs, only one alert is shown
			// 		So i will have only 1 state value and it will change based on the input id

			// 		so i can access it by input.[target] in the JSX
			// 	*/
			// 	setSignupRegex({
			// 		alert_message: `Invalid ${placeholder}`,
			// 		input: { [target]: true }
			// 	})

			// 	// Here we always remove the message so it's ok to set only the input
			// } else setSignupRegex({ input: { [target]: false }})

		}

		console.log(target);

		if(id.includes('last-name')) {

			// if(!value.match(regex.name)) {

			// 	/*
			// 		I did this because when i have multiple inputs, only one alert is shown
			// 		So i will have only 1 state value and it will change based on the input id

			// 		so i can access it by input.[target] in the JSX
			// 	*/
			// 	setSignupRegex({
			// 		alert_message: `Invalid ${placeholder}`,
			// 		input: { [target]: true }
			// 	})

			// 	// Here we always remove the message so it's ok to set only the input
			// } else setSignupRegex({ input: { [target]: false }})

		}

		e.stopPropagation();
	}

	return (
		<div id='login-modal' className='rounded'>
			<Form name='login' onSubmit={signUp} >
				<div className="form-header d-flex flex-row justify-content-between align-items-center">
					<a className='w-50 py-3 text-center'>Log in</a>
					<a className='w-50 py-3 text-center active-modal'>Sign up</a>
				</div>

				<Form.Row className='flex-column form-body px-4 pt-5'>
					<Form.Row className='py-2'>
						<Form.Group as={Col} controlId="signup-last-name" className='m-0'>
							<Form.Control 
								type="text" 
								placeholder="Last Name" 
								value={signup_state.last_name} 
								onChange={handleChange}
								onBlur={signupValidation} 
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="signup-first-name" className='m-0'>
							<Form.Control 
								type="text" 
								placeholder="First Name" 
								value={signup_state.first_name} 
								onChange={handleChange}
								onBlur={signupValidation}
							/>
						</Form.Group>
					</Form.Row>

					{signup_regex.input.signup_last_name && <RegexAlert text={signup_regex.alert_message} danger={true} />}
					{signup_regex.input.signup_first_name && <RegexAlert text={signup_regex.alert_message} danger={true} />}
				</Form.Row>

				<Form.Row className='flex-column form-body px-4'>
					<Form.Row className='py-2'>
						<Form.Group as={Col} controlId="signup-age" className='m-0'>
							<Form.Control 
								type="text" 
								placeholder="How old are you ?" 
								value={signup_state.age} 
								onKeyDown={disableLetters} 
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="signup-gender" className='m-0'>
							<Form.Control as='select' value={signup_state.gender} onChange={handleChange} >
								<option disabled>Pick your gender</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>
				</Form.Row>

				<Form.Row className='form-body px-4'>
					<Form.Group as={Col} controlId="signup-city">
						<Form.Control 
							type="text" 
							placeholder="City" 
							value={signup_state.city} 
							onChange={handleChange} 
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="signup-address">
						<Form.Control 
							type='text' 
							placeholder='Address' 
							value={signup_state.address} 
							onChange={handleChange} 
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-4'>
					<Form.Group as={Col} controlId="signup-email">
						<Form.Control 
							type="text" 
							placeholder="Email" 
							value={signup_state.email} 
							onChange={handleChange} 
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-4 mb-3 flex-column'>
					<Form.Group as={Col} controlId="signup-password">
						<Form.Control 
							type="password" 
							placeholder="Password, at least 8 characters" 
							value={signup_state.password} 
							onChange={handleChange} 
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="signup-confirm-password">
						<Form.Control 
							type="password" 
							placeholder="Confirm Password" 
							value={signup_state.confirm_password} 
							onChange={handleChange} 
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-4 flex-column align-items-center'>
					{auth_loader ? <AuthLoader /> : <Button id='signup-auth' type='submit' className='mx-auto py-2'>Sign up</Button> }
				</Form.Row>

				<p className='or my-4 text-center text-secondary position-relative'>or</p>

				<Form.Row className='form-footer d-flex flex-column justify-content-center align-items-center px-4 pb-4'>
					<button 
						type='button'
						className="mb-3 p-0 border-0 rounded facebook-signin d-flex flex-row justify-content-between align-items-stretch"
						onClick={socialAuthentication}
						>
						<span><img className='m-0' src={getImage('facebook-icon-white.svg')} alt='facebook icon' /></span>
						<p className='w-100 py-2 m-0 font-weight-bold'>Sign up with facebook</p>
					</button>

					<button 
						type='button'
						className="mb-3 p-0 rounded google-signin d-flex flex-row justify-content-center align-items-stretch"
						onClick={socialAuthentication}
						>
						<span><img className='m-0' src={getImage('google-icon.svg')} alt='google icon' /></span>
						<p className='w-100 p-2 m-0 font-weight-bold'>Sign up with google</p>
					</button>
				</Form.Row>

			</Form>
		</div>
	)
}

export default SignUp;
