import React, { useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import AuthenticationReducer from '@reducers/AuthenticationReducer';
import {

	HANDLE_LOGIN_INPUT

} from '@constants/actionTypes';

import AuthLoader from './AuthLoader';
import RegexAlert from '@components/global_layout/RegexAlert';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const LogIn = () => {

	const {

		toggleModal,
		socialAuthentication,
		loginAuth,
		auth_loader,
		authentication_regex

	} = useContext(AuthenticationContext);

	const {

		getImage

	} = useContext(GlobalContext);

	const defaultLoginState = {
		email: '',
		password: ''
	}

	const [login_state, dispatch] = useReducer(AuthenticationReducer, defaultLoginState);

	const handleChange = e => {

		// Remove the `login-` string from id and replace `-` with `_`
		// To match the key from login_state
		const target = e.target.id.substring(e.target.id.indexOf('-') + 1).replace(/\-/g, '_');

		dispatch({ type: HANDLE_LOGIN_INPUT, target, payload: e.target.value });

		e.stopPropagation();
	}

	const login = e => {

		e.preventDefault();
		e.stopPropagation();

		loginAuth(login_state.email, login_state.password);
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
							value={login_state.email}
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="login-password" className='mb-4'>
						<Form.Control
							type="password"
							placeholder="Password"
							value={login_state.password}
							onChange={handleChange}
						/>
					</Form.Group>

					<div className='w-100 d-flex flex-column align-items-center'>

						{auth_loader ? <AuthLoader /> : (
							<>

								{authentication_regex && <RegexAlert text={authentication_regex} danger={true} />}

								<Button id='login-auth' type='submit' className={`mx-auto mb-3 py-2 ${authentication_regex && 'mt-3'}`}>Log in</Button>
								<Link 
									to='forgot-password'
									className='mx-auto text-decoration-underline text-secondary'
									onClick={toggleModal}
								>
									Forgot Password ?
								</Link>
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
						<span><img className='m-0' src={getImage('facebook-icon-white.svg')} alt='facebook icon' /></span>
						<p className='w-100 py-2 m-0 font-weight-bold'>Sign in with facebook</p>
					</button>

					<button 
						type='button'
						className="mb-3 p-0 rounded google-signin d-flex flex-row justify-content-center align-items-stretch"
						onClick={socialAuthentication}
						>
						<span><img className='m-0' src={getImage('google-icon.svg')} alt='google icon' /></span>
						<p className='w-100 p-2 m-0 font-weight-bold'>Sign in with google</p>
					</button>
				</Form.Row>

			</Form>
		</div>
	)
}

export default LogIn;
