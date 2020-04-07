import React, { useContext } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';

import LogIn from './LogIn';
import SignUp from './SignUp';

const AuthenticationModal = () => {

	const {

		login_enabled,
		signup_enabled,
		toggleModal

	} = useContext(AuthenticationContext);

	// const 

	return (
		<section id='authentication-modal' className='d-flex flex-column justify-content-center align-items-center' onClick={toggleModal}>

			<button className='close-modal position-absolute border-0' aria-label='close authentication modal'><i className="fas fa-times"></i></button>

			{login_enabled && <LogIn /> }
			{signup_enabled && <SignUp /> }
			
		</section>
	)
}

export default AuthenticationModal;
