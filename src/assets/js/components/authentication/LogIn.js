import React, { useContext, useReducer, useState } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';

import RegexReducer from '@reducers/RegexReducer';
import AuthenticationReducer from '@reducers/AuthenticationReducer';

import {

	HANDLE_LOGIN_INPUT,
	SET_REGEX_ALERT,
	RESET_REGEX_ALERT

} from '@constants/actionTypes';

import AuthLoader from './AuthLoader';
import RegexAlert from '@components/global_layout/RegexAlert';
import Image from '@components/global_layout/Image';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const LogIn = () => {

	const {

		socialAuthentication,
		loginAuth,
		auth_loader,
		authentication_regex

	} = useContext(AuthenticationContext);

	const defaultLoginState = {
		email: '',
		password: ''
	}

	const [login_state, dispatch_login_state] = useReducer(AuthenticationReducer, defaultLoginState);

	const defaultRegexState = {
		email: undefined,
		password: undefined,
		global: undefined
	}
	
	const [login_regex, dispatch_login_regex] = useReducer(RegexReducer, defaultRegexState);

	const handleChange = e => {

		// Remove the `login-` string from id and replace `-` with `_`
		// To match the key from login_state
		const target = e.target.id.substring(e.target.id.indexOf('-') + 1).replace(/\-/g, '_');

		dispatch_login_state({ type: HANDLE_LOGIN_INPUT, target, payload: e.target.value });

		e.stopPropagation();
	}

	const login = e => {

		const alert_danger = ['incorrect-validation', 'border-danger'];
		const inputs_available = document.querySelectorAll('form[name="login"] .input-field');
		const inputs_correct = document.querySelectorAll('form[name="login"] .correct-validation');
		
		if(inputs_available.length === inputs_correct.length) loginAuth(login_state.email, login_state.password);
		else {

			inputs_available.forEach(input => {

				if(!input.classList.contains('correct-validation')) {

					input.classList.add(...alert_danger);

					setTimeout(() => input.classList.remove(...alert_danger), 3000);
				}
			});

			dispatch_login_regex({ type: SET_REGEX_ALERT, target: 'global', payload: 'All inputs are required' });

			setTimeout(() => dispatch_login_regex({ type: SET_REGEX_ALERT, target: 'global', payload: undefined }), 3000);
		}

		e.preventDefault();
		e.stopPropagation();
	}

	const loginRegex = e => {

		const alert_danger = ['incorrect-validation', 'border-danger'];

		// for email
		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

		const {

			id,
			value

		} = e.target;

		const isEmpty = value.length === 0;

		// Remove the `login-` string from id and replace `-` with `_`
		const target = id.substring(id.indexOf('-') + 1).replace(/\-/g, '_');

		if(id.includes('email')) {

			if(!value.match(regex)) dispatch_login_regex({ type: SET_REGEX_ALERT, target, payload: 'Invalid email' });

			if(isEmpty) dispatch_login_regex({ type: SET_REGEX_ALERT, target, payload: 'Email is required to login' });

			if(isEmpty || !value.match(regex)) {

				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);
			}

			if(!isEmpty && value.match(regex)) {

				dispatch_login_regex({ type: SET_REGEX_ALERT, target, payload: undefined });

				e.target.classList.add('correct-validation');
				e.target.classList.remove(...alert_danger);
			}
		}

		if(id.includes('password')) {

			if(isEmpty) {

				dispatch_login_regex({ type: SET_REGEX_ALERT, target, payload: 'Password is required to login' });

				e.target.classList.remove('correct-validation');
				e.target.classList.add(...alert_danger);

			} else {

				dispatch_login_regex({ type: SET_REGEX_ALERT, target, payload: undefined });

				e.target.classList.add('correct-validation');
				e.target.classList.remove(...alert_danger);
			}
		}
	}

	return (
		<div id='login-modal' className='rounded'>
			<Form name='login' onSubmit={login}>
				<div className="form-header d-flex flex-row justify-content-between align-items-center">
					<a className='w-50 py-3 text-center active-modal'>Log in</a>
					<a className='w-50 py-3 text-center'>Sign up</a>
				</div>

				<Form.Row className='form-body flex-column align-items-center px-4 pt-5'>
					<Form.Group as={Col} controlId="login-email" className='mb-4'>
						<Form.Control 
							type="text"
							placeholder="Enter email"
							className='input-field'
							value={login_state.email}
							onChange={handleChange}
							onBlur={loginRegex}
						/>

						{login_regex.email && <RegexAlert text={login_regex.email} danger={true} />}
					</Form.Group>

					<Form.Group as={Col} controlId="login-password" className='mb-4'>
						<Form.Control
							type="password"
							placeholder="Password"
							className='input-field'
							value={login_state.password}
							onChange={handleChange}
							onBlur={loginRegex}
						/>
					</Form.Group>

					<div className='w-100 d-flex flex-column align-items-center'>

						{auth_loader ? <AuthLoader /> : (
							<>

								{login_regex.global && <RegexAlert text={login_regex.global} danger={true} />}
								{authentication_regex && <RegexAlert text={authentication_regex} danger={true} />}

								<Button id='login-auth' type='submit' className={`mx-auto mb-3 py-2 ${authentication_regex || login_regex.global ? 'mt-3' : ''}`}>Log in</Button>
								<Button 
									id='reset-password-btn' 
									type='button'
									className='mx-auto text-secondary'
								>
									Reset Password
								</Button>
							</>
						)}
					</div>
					
				</Form.Row>

				<p className='my-5 text-center text-secondary position-relative'>or</p>

				<Form.Row className='form-footer d-flex flex-column justify-content-center align-items-center px-4 pb-4'>
					<button 
						type='button'
						className="mb-3 p-0 border-0 rounded facebook-signin d-flex flex-row justify-content-between align-items-stretch"
						onClick={socialAuthentication}
						>
						<span><Image src='facebook-icon-white.svg' /></span>
						<p className='w-100 py-2 m-0 font-weight-bold'>Sign in with facebook</p>
					</button>

					<button 
						type='button'
						className="mb-3 p-0 rounded google-signin d-flex flex-row justify-content-center align-items-stretch"
						onClick={socialAuthentication}
						>
						<span><Image src='google-icon.svg' /></span>
						<p className='w-100 p-2 m-0 font-weight-bold'>Sign in with google</p>
					</button>
				</Form.Row>

			</Form>
		</div>
	)
}

export default LogIn;
