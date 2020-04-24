import React, { useContext } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';

import LogIn from './LogIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const AuthenticationModal = () => {

	const {

		login_enabled,
		signup_enabled,
		reset_password_enabled,
		toggleModal

	} = useContext(AuthenticationContext);

	return (
		<section id='authentication-modal' className='py-4 d-flex flex-column justify-content-stretch align-items-center overflow-auto' onClick={toggleModal}>

			<button className='close-modal position-absolute border-0' aria-label='close authentication modal'><i className="fas fa-times"></i></button>

			{login_enabled && <LogIn /> }
			{signup_enabled && <SignUp /> }
			{reset_password_enabled && <ForgotPassword />}
			
		</section>
	)
}

export default AuthenticationModal;
