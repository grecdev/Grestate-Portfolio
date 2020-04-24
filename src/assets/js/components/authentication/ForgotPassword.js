import React, { useContext, useState } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';

import AuthLoader from './AuthLoader';
import RegexAlert from '@components/global_layout/RegexAlert';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ForgotPassword = () => {

	const {

		auth_loader,
		authentication_regex,
		resetPasswordAuth

	} = useContext(AuthenticationContext);

	const [email_state, setEmail] = useState('');
	const [email_regex, setRegex] = useState(undefined);

	const handleChange = e => {

		setEmail(e.target.value);

		e.stopPropagation();
	}
	
	const emailRegex = e => {

		const {

			value
		 	
		} = e.target;

		const alert_danger = ['incorrect-validation', 'border-danger'];

		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

		const isEmpty = value.length === 0;

		if(!value.match(regex)) setRegex('Invalid Email');

		if(isEmpty) setRegex('Email is required to reset the password');

		if(isEmpty || !value.match(regex)) {

			e.target.classList.remove('correct-validation');
			e.target.classList.add(...alert_danger);
		}

		if(!isEmpty && value.match(regex)) {

			setRegex(undefined);

			e.target.classList.add('correct-validation');
			e.target.classList.remove(...alert_danger);
		}
	}

	const resetPassword = e => {

		const alert_danger = ['incorrect-validation', 'border-danger'];

		// If the email is validated
		if(document.getElementById('reset-password-email').value.length === 0) {

			setRegex('Invalid Email');
			document.getElementById('reset-password-email').classList.add(...alert_danger);

			setTimeout(() => {

				setRegex(undefined);
				document.getElementById('reset-password-email').classList.remove(...alert_danger);

			}, 3000);
			
		} else {

			setRegex(undefined);
			resetPasswordAuth(email_state);
		}

		e.preventDefault();
		e.stopPropagation();
	}

	return (
		<div id='reset-password-modal' className='rounded pb-3'>
			<Form name='reset-password' onSubmit={resetPassword}>
				<div className="form-header d-flex flex-row justify-content-between align-items-center">
					<a className='w-50 py-3 text-center'>Log in</a>
					<a className='w-50 py-3 text-center'>Sign up</a>
				</div>

				<Form.Row className='form-body flex-column align-items-center px-4 pt-5'>
					<Form.Group as={Col} controlId="reset-password-email" className='mb-4'>
						<Form.Control
							type="text"
							placeholder="Your Email"
							value={email_state}
							onChange={handleChange}
							onBlur={emailRegex}
						/>
					</Form.Group>
					
					<div className='w-100 d-flex flex-column align-items-center'>

						{auth_loader ? <AuthLoader /> : (
							<>
								<Button 
									id='reset-password'
									type='submit'
									className={authentication_regex || email_regex ? 'mb-2' : ''}
								>
									Send reset link
								</Button>

								{authentication_regex && <RegexAlert text={authentication_regex} danger={authentication_regex.includes('successfully') ? false : true} />}
								{email_regex && <RegexAlert text={email_regex} danger={true} />}
							</>

						)}
					</div>
					
				</Form.Row>

			</Form>
		</div>
	)
}

export default ForgotPassword;
