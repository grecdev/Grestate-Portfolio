import React, { useContext } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SignUp = () => {

	const {

		toggleModal,
		socialAuthentication

	} = useContext(AuthenticationContext);

	const {

		getImage

	} = useContext(GlobalContext);

	return (
		<div id='login-modal' className='rounded'>
			<Form name='login'>
				<div className="form-header d-flex flex-row justify-content-between align-items-center">
					<a className='w-50 py-3 text-center'>Log in</a>
					<a className='w-50 py-3 text-center active-modal'>Sign up</a>
				</div>

				<Form.Row className='form-body px-4 pt-5'>
					<Form.Group as={Col} controlId="first-name" className='mb-4'>
						<Form.Control type="text" placeholder="First Name" />
					</Form.Group>

					<Form.Group as={Col} controlId="last-name" className='mb-4'>
						<Form.Control type="text" placeholder="Last Name" />
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-4'>
					<Form.Group as={Col} controlId="signup-email" className='mb-4'>
						<Form.Control type="text" placeholder="Email" />
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-4 mb-3'>
					<Form.Group as={Col} controlId="signup-password">
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>

					<Form.Group as={Col} controlId="confirm-password">
						<Form.Control type="password" placeholder="Confirm Password" />
					</Form.Group>
				</Form.Row>

				<Form.Row className='form-body px-4 flex-column'>
					<Button id='signup-auth' className='mx-auto py-2'>Sign up</Button>
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
