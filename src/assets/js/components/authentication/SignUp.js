import React, { useContext, useReducer, useState } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import RegexReducer from '@reducers/RegexReducer';
import AuthenticationReducer from '@reducers/AuthenticationReducer';
import {

	HANDLE_SIGNUP_INPUT,
	SET_REGEX_ALERT,
	RESET_REGEX_ALERT

} from '@constants/actionTypes';

import Image from '@components/global_layout/Image';
import RegexAlert from '@components/global_layout/RegexAlert';
import AuthLoader from './AuthLoader';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SignUp = () => {

	const {

		socialAuthentication,
		signUpAuth,
		auth_loader,
		authentication_regex

	} = useContext(AuthenticationContext);

	const {

		disableLetters

	} = useContext(GlobalContext);

	const defaultSignupState = {
		first_name: '',
		last_name: '',
		age: '',
		gender: 'Choose your gender',
		city: '',
		address: '',
		email: '',
		password: '',
		confirm_password: ''
	};

	const [signup_state, dispatch_signupState] = useReducer(AuthenticationReducer, defaultSignupState);

	const signUp = e => {

		let submit;

		const alert_danger = ['incorrect-validation', 'border-danger'];

		// When i will check if all inputs are correctly completed
		const inputs_available = document.querySelectorAll(`form[name="${e.target.name}"] .input-field`);
		const inputs_correct = document.querySelectorAll(`form[name="${e.target.name}"] .correct-validation`);

		if(inputs_available.length === inputs_correct.length) {

			signUpAuth(signup_state);

			submit = true;

		} else {

			inputs_available.forEach(input => {

				if(!input.classList.contains('correct-validation')) {

					input.classList.add(...alert_danger);

					setTimeout(() => input.classList.remove(...alert_danger), 2500);
				}
			});

			dispatch_signupRegex({ type: RESET_REGEX_ALERT, payload: defaultRegexState });
			dispatch_signupRegex({ type: SET_REGEX_ALERT, target: 'global' , payload: 'All inputs are required' });

			setTimeout(() => dispatch_signupRegex({ type: SET_REGEX_ALERT, target: 'global' , payload: undefined }), 2500)

			submit = false;
		}

		const console_style = 'background: green; padding: 10px; border: 3px #000 dotted';

		console.log(`%c Form has been submitted ? ${submit}`, console_style);
		e.preventDefault();
		e.stopPropagation();
		return submit;
	}

	const handleChange = e => {

		// Remove the `signup-` string from id and replace `-` with `_`
		const target = e.target.id.substring(e.target.id.indexOf('-') + 1).replace(/\-/g, '_');

		dispatch_signupState({ type: HANDLE_SIGNUP_INPUT, target, payload: e.target.value });
		
		e.stopPropagation();
	}

	const defaultRegexState = {
		last_name: undefined,
		first_name: undefined,
		age: undefined,
		gender: undefined,
		city: undefined,
		password: undefined,
		confirm_password: undefined,
		global: undefined
	};

	const [signup_regex, dispatch_signupRegex] = useReducer(RegexReducer, defaultRegexState);

	const signupValidation = e => {

		const {

			id,
			placeholder,
			value

		} = e.target;

		// Remove the `signup-` string from id and replace `-` with `_`
		const target = e.target.id.substring(e.target.id.indexOf('-') + 1).replace(/\-/g, '_');

		const isEmpty = value.length === 0;

		const regex = {
			name: /^[aA-zZ \-]{3,}$/g,
			age: /^\D$/g,
			gender: /^(male|female)$/gi,
			city: /^[aA-zZ]{3,}$/g,
			address: /^[\w\- ,.]{3,}$/g,
			email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
			password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z].{8,}$/gi
		}

		const alert_danger = ['incorrect-validation', 'border-danger'];

		if(id.includes('name')) {

			if(!value.match(regex.name)) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: `Invalid ${placeholder}` });

			if(isEmpty) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: `${placeholder} is required` });

			if(isEmpty || !value.match(regex.name)) {

				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);
			}

			if(!isEmpty && value.match(regex.name)) {

				dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: undefined });

				e.target.classList.add('correct-validation');
				e.target.classList.remove(...alert_danger);
			}
		}

		if(id.includes('age')) {

			if(value.match(regex.age) || isEmpty) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: `Invalid age` });

			if(parseFloat(value) < 18) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: 'Must be over 18 years old' });
			if(parseFloat(value) > 100) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: 'Don\'t you think you are to old ?' });

			if(value.match(regex.age) || parseFloat(value) < 18 || parseFloat(value) > 100 || isEmpty) {

				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);

			} else {

				dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: undefined });

				e.target.classList.add('correct-validation');
				e.target.classList.remove(...alert_danger);
			}
		}

		if(id.includes('gender')) {

			if(!value.match(regex.gender)) {

				dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: 'Need to select a gender' });

				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);

			} else {

				dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: undefined });

				e.target.classList.remove(...alert_danger);
				e.target.classList.add('correct-validation');
			}
		}

		if(id.includes('city')) {

			if(!value.match(regex.city)) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: `Invalid ${placeholder}` });

			if(isEmpty) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: `${placeholder} is required` });

			if(isEmpty || !value.match(regex.city)) {

				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);
			}

			if(!isEmpty && value.match(regex.city)) {

				dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: undefined });

				e.target.classList.add('correct-validation');
				e.target.classList.remove(...alert_danger);
			}
		}
		
		if(id.includes('address')) {

			if(!value.match(regex.address)) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: `Invalid ${placeholder}` });

			if(isEmpty) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: `${placeholder} is required` });

			if(isEmpty || !value.match(regex.address)) {

				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);
			}

			if(!isEmpty && value.match(regex.address)) {

				dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: undefined });

				e.target.classList.add('correct-validation');
				e.target.classList.remove(...alert_danger);
			}
		}

		if(id.includes('email')) {

			if(!value.match(regex.email)) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: `Invalid ${placeholder}` });

			if(isEmpty) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: `${placeholder} is required` });

			if(isEmpty || !value.match(regex.email)) {

				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);
			}

			if(!isEmpty && value.match(regex.email)) {

				dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: undefined });

				e.target.classList.add('correct-validation');
				e.target.classList.remove(...alert_danger);
			}
		}

		if(target === 'password') {

			const div = document.createElement('div');

			// So we display only one error
			document.body.contains(document.querySelector('form[name="signup"] .password-regex')) && document.querySelector('form[name="signup"] .password-regex').remove();

			if(!value.match(regex.password)) {

				div.classList.add('my-2', 'p-0', 'bg-white', 'text-center', 'text-danger', 'password-regex');

				div.innerHTML = `
					${value.length < 8 ? `<p class='mb-3'>Password needs to contain at least 8 characters</p>` : ''}
					${!value.match(/\d{1,}/g) ? `<p class='mb-3'>Password needs to contain at least 1 number</p>` : ''}
					${!value.match(/[a-z]{1,}/g) ? `<p class='mb-3'>Password needs to contain at least 1 lowercase character</p>` : ''}
					${!value.match(/[A-Z]{1,}/g) ? `<p class='mb-3'>Password needs to contain at least 1 uppercase character</p>` : ''}
				`;
				
				e.target.parentElement.insertAdjacentElement('beforeend', div);
				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);

			} else {

				document.body.contains(document.querySelector('form[name="signup"] .password-regex')) && document.querySelector('form[name="signup"] .password-regex').remove();
				e.target.classList.add('correct-validation');
				e.target.classList.remove(...alert_danger);
			}
		}

		if(target === 'confirm_password') {

			if(signup_state.password === signup_state.confirm_password) {

				dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: undefined });

				e.target.classList.add('correct-validation');
				e.target.classList.remove(...alert_danger);

			} else dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: 'Password does not match' });

			if(isEmpty || signup_state.password !== signup_state.confirm_password) {

				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);
			}

			if(isEmpty) dispatch_signupRegex({ type: SET_REGEX_ALERT, target, payload: 'You need to confirm password' });
		}

		e.stopPropagation();
	}

	return (
		<div id='signup-modal' className='rounded'>
			<Form name='signup' onSubmit={signUp} >
				<div className="form-header d-flex flex-row justify-content-between align-items-center">
					<a className='w-50 py-3 text-center'>Log in</a>
					<a className='w-50 py-3 text-center active-modal'>Sign up</a>
				</div>

				<Form.Row className='form-body px-3 pt-4 m-0 my-3'>
					<Form.Group as={Col} controlId="signup-last-name" className='m-0'>
						<Form.Control 
							type="text" 
							placeholder="Last Name"
							className='input-field'
							value={signup_state.last_name} 
							onChange={handleChange}
							onBlur={signupValidation}
						/>

						{signup_regex.last_name && <RegexAlert text={signup_regex.last_name} danger={true} />}
					</Form.Group>

					<Form.Group as={Col} controlId="signup-first-name" className='m-0'>
						<Form.Control 
							type="text" 
							placeholder="First Name"
							className='input-field'
							value={signup_state.first_name} 
							onChange={handleChange}
							onBlur={signupValidation}
						/>

						{signup_regex.first_name && <RegexAlert text={signup_regex.first_name} danger={true} />}
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-3 m-0 my-3'>
					<Form.Group as={Col} controlId="signup-age" className='m-0'>
						<Form.Control 
							type="text" 
							placeholder="How old are you ?"
							className='input-field'
							value={signup_state.age} 
							onKeyDown={disableLetters} 
							onChange={handleChange}
							onBlur={signupValidation}
						/>

						{signup_regex.age && <RegexAlert text={signup_regex.age} danger={true} />}
					</Form.Group>

					<Form.Group as={Col} controlId="signup-gender" className='m-0'>
						<Form.Control 
							as='select'
							className='input-field'
							value={signup_state.gender} 
							onChange={handleChange} 
							onBlur={signupValidation}
						>
							<option disabled>Choose your gender</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
						</Form.Control>

						{signup_regex.gender && <RegexAlert text={signup_regex.gender} danger={true} />}
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-3 m-0 my-3'>
					<Form.Group as={Col} controlId="signup-city" className='m-0'>
						<Form.Control 
							type="text" 
							placeholder="City"
							className='input-field'
							value={signup_state.city} 
							onChange={handleChange}
							onBlur={signupValidation}
						/>

						{signup_regex.city && <RegexAlert text={signup_regex.city} danger={true} />}
					</Form.Group>

					<Form.Group as={Col} controlId="signup-address" className='m-0'>
						<Form.Control 
							type='text' 
							placeholder='Address'
							className='input-field'
							value={signup_state.address} 
							onChange={handleChange} 
							onBlur={signupValidation}
						/>

						{signup_regex.address && <RegexAlert text={signup_regex.address} danger={true} />}
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-3 m-0 my-3'>
					<Form.Group as={Col} controlId="signup-email" className='m-0'>
						<Form.Control 
							type="text" 
							placeholder="Email"
							className='input-field'
							value={signup_state.email} 
							onChange={handleChange}
							onBlur={signupValidation}
						/>

						{signup_regex.email && <RegexAlert text={signup_regex.email} danger={true} />}
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-3 m-0 mb-4 flex-column'>
					<Form.Group as={Col} controlId="signup-password">
						<Form.Control 
							type="password"
							placeholder="Password, at least 8 characters" 
							className='input-field'
							value={signup_state.password} 
							onChange={handleChange}
							onBlur={signupValidation}
						/>

						<div className='password-strength d-flex justify-content-start align-items-center mt-2'>

							<div className={`${signup_state.password.length > 0 ? 'show' : ''} rounded mx-1`}></div>
							<div className={`${signup_state.password.length >= 6 ? 'show' : ''} rounded mx-1`}></div>
							<div className={`${signup_state.password.length >= 8 ? 'show' : ''} rounded mx-1`}></div>

						</div>

						{signup_regex.password && <RegexAlert text={signup_regex.password} danger={true} />}
					</Form.Group>

					<Form.Group as={Col} controlId="signup-confirm-password">
						<Form.Control 
							type="password" 
							placeholder="Confirm Password"
							className='input-field'
							value={signup_state.confirm_password} 
							onChange={handleChange}
							onBlur={signupValidation}
						/>

						{signup_regex.confirm_password && <RegexAlert text={signup_regex.confirm_password} danger={true} />}
						{authentication_regex && <RegexAlert text={authentication_regex} danger={true} />}
					</Form.Group>

					{signup_regex.global && <RegexAlert text={signup_regex.global} danger={true} />}
				</Form.Row>

				<Form.Row className='form-body px-3 m-0 my-2 flex-column align-items-center'>
					{auth_loader ? <AuthLoader /> : <Button id='signup-auth' type='submit' className='mx-auto py-2'>Sign up</Button> }
				</Form.Row>

				<p className='or my-4 text-center text-secondary position-relative'>or</p>

				<Form.Row className='form-footer d-flex flex-column justify-content-center align-items-center px-4 pb-4'>
					<button 
						type='button'
						className="mb-3 p-0 border-0 rounded facebook-signin d-flex flex-row justify-content-between align-items-stretch"
						onClick={socialAuthentication}
						>
						<span><Image src='facebook-icon-white.svg' /></span>
						<p className='w-100 py-2 m-0 font-weight-bold'>Sign up with facebook</p>
					</button>

					<button 
						type='button'
						className="mb-3 p-0 rounded google-signin d-flex flex-row justify-content-center align-items-stretch"
						onClick={socialAuthentication}
						>
						<span><Image src='google-icon.svg' /></span>
						<p className='w-100 p-2 m-0 font-weight-bold'>Sign up with google</p>
					</button>
				</Form.Row>

			</Form>
		</div>
	)
}

export default SignUp;
