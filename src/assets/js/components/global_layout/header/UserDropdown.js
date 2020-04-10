import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '@context/AuthenticationContext';

import Button from 'react-bootstrap/Button';

const UserDropdown = () => {

	const {

		signOut

	} = useContext(AuthenticationContext);

	const toggleDropdown = e => {

		const dropdown = e.target.nextElementSibling;

		if(!dropdown.classList.contains('dropdown-visible')) dropdown.classList.add('dropdown-visible');
		else dropdown.classList.remove('dropdown-visible');

		e.stopPropagation();
	}

	return (
		<div id="user-dropdown" className='position-relative'>
			<i onClick={toggleDropdown} className="fas fa-user"></i>

			<div id="user-dropdown-menu" className='position-absolute d-flex flex-column justify-content-around align-items-center p-3'>
				<p className='m-0 text-white'>Name</p>
				<p className='text-white'>email</p>
				<Link to='my-account' className='text-white mb-3'>My Account</Link>
				<Button 
					type='button'
					id='logout-btn'
					className='text-white border-0 shadow-none nav-link mx-3 w-100'
					onClick={signOut}
				>
					Log out
				</Button>
			</div>
		</div>
	)
}

export default UserDropdown;
