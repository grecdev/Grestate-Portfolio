import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const LogIn = () => {

	const {

		toggleModal

	} = useContext(AuthenticationContext);

	const {

		getImage

	} = useContext(GlobalContext);

	return (
		<div id='login-modal' className='rounded'>
			<Form name='login'>
				<div className="form-header d-flex flex-row justify-content-between align-items-center">
					
					<a className='w-50 py-3 text-center active-modal'>Log in</a>
					<a className='w-50 py-3 text-center'>Sign up</a>

				</div>

				<Form.Row className='form-body flex-column px-4 pt-5'>
					<Form.Group as={Col} controlId="login-email" className='mb-4'>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>

					<Form.Group as={Col} controlId="login-password" className='mb-4'>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>

					<Button id='login-auth' className='mx-auto mb-3 py-2'>Log in</Button>
					<Link 
						to='forgot-password'
						className='mx-auto text-decoration-underline text-secondary'
						onClick={toggleModal}
					>
						Forgot Password ?
					</Link>
					
				</Form.Row>

				<p className='my-5 text-center text-secondary position-relative'>or</p>

				<Form.Row className='form-footer d-flex flex-column justify-content-center align-items-center px-4 pb-4'>
					
					<button type='button' className="mb-3 p-0 border-0 rounded facebook-signin d-flex flex-row justify-content-between align-items-center">
						<span className='py-2 px-3'><i className="fab fa-facebook-f"></i></span>
						<p className='w-100 p-2 m-0 font-weight-bold'>Sign in with facebook</p>
					</button>

					<button type='button' className="mb-3 p-0 rounded google-signin d-flex flex-row justify-content-center align-items-stretch">
						<span><img className='m-0' src={getImage('google-icon.svg')} alt='google icon' /></span>
						<p className='w-100 p-2 m-0 font-weight-bold'>Sign in with google</p>
					</button>
				</Form.Row>

			</Form>
		</div>
	)
}

export default LogIn;
