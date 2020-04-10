import React, { useContext, useReducer } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import AuthenticationReducer from '@reducers/AuthenticationReducer';
import {

	HANDLE_SIGNUP_INPUT

} from '@constants/actionTypes';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SignUp = () => {

	const {

		socialAuthentication,
		signUpAuth

	} = useContext(AuthenticationContext);

	const {

		getImage

	} = useContext(GlobalContext);

	const defaultSignupState = {
		first_name: '',
		last_name: '',
		signup_email: '',
		signup_password: '',
		confirm_password: ''
	};

	const [state, dispatch] = useReducer(AuthenticationReducer, defaultSignupState);

	const signUp = e => {

		e.stopPropagation();
		e.preventDefault();

		signUpAuth(state.signup_email, state.confirm_password);
	}

	const handleChange = e => {

		e.stopPropagation();

		dispatch({ type: HANDLE_SIGNUP_INPUT, target: e.target.id.replace(/\-/g, '_'), payload: e.target.value });
	}

	return (
		<div id='login-modal' className='rounded'>
			<Form name='login' onSubmit={signUp} >
				<div className="form-header d-flex flex-row justify-content-between align-items-center">
					<a className='w-50 py-3 text-center'>Log in</a>
					<a className='w-50 py-3 text-center active-modal'>Sign up</a>
				</div>

				<Form.Row className='form-body px-4 pt-5'>
					<Form.Group as={Col} controlId="first-name" className='mb-4'>
						<Form.Control type="text" placeholder="First Name" value={state.first_name} onChange={handleChange} />
					</Form.Group>

					<Form.Group as={Col} controlId="last-name" className='mb-4'>
						<Form.Control type="text" placeholder="Last Name" value={state.last_name} onChange={handleChange} />
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-4'>
					<Form.Group as={Col} controlId="signup-email" className='mb-4'>
						<Form.Control type="text" placeholder="Email" value={state.signup_email} onChange={handleChange} />
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-4 mb-3 flex-column'>
					<Form.Group as={Col} controlId="signup-password">
						<Form.Control type="password" placeholder="Password, at least 8 characters" value={state.signup_password} onChange={handleChange} />
					</Form.Group>

					<Form.Group as={Col} controlId="confirm-password">
						<Form.Control type="password" placeholder="Confirm Password" value={state.confirm_password} onChange={handleChange} />
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-4 flex-column'>
					<Button id='signup-auth' type='submit' className='mx-auto py-2'>Sign up</Button>
				</Form.Row>

				<p className='or my-5 text-center text-secondary position-relative'>or</p>

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
