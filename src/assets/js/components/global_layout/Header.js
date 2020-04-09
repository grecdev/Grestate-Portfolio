import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AuthenticationContext } from '@context/AuthenticationContext';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const Header = () => {

	const {

		toggleModal,
		user,
		signOut

	} = useContext(AuthenticationContext);

	const userDropdown = e => {

		const dropdown = e.target.nextElementSibling;

		if(!dropdown.classList.contains('dropdown-visible')) {

			dropdown.classList.add('dropdown-visible')

		} else {

			dropdown.classList.remove('dropdown-visible')
		}

		e.stopPropagation();
	}

	return (
		<header onClick={toggleModal} >
			<Navbar id='desktop-navbar' className='justify-content-between align-items-center'>
				<NavLink className='navbar-brand p-0 m-0' exact to='/'>Gr<span>estate</span></NavLink>

				<Nav activeKey='/home' className='align-items-center'>
					<Nav.Item>
						<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 mx-3' exact to='/'>Home</NavLink>
					</Nav.Item>

					<Nav.Item>
						<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 mx-3' exact to='/buy-properties'>Buy</NavLink>
					</Nav.Item>

					<Nav.Item>
						<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 mx-3' to='/rental-listings'>Rent</NavLink>
					</Nav.Item>

					<Nav.Item>
						<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 mx-3' to='/mortage-calculator'>Mortage Calculator</NavLink>
					</Nav.Item>

					{ user ? (

						<div id="user-dropdown" className='position-relative'>
							<i onClick={userDropdown} className="fas fa-user"></i>

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

					) : (
					<>
						<Nav.Item>
							<Button type='button' id='login-btn' className='shadow-none nav-link mx-3'>Login</Button>
						</Nav.Item>

						<Nav.Item>
							<Button type='button' id='signup-btn' className='shadow-none nav-link mx-3'>Sign up</Button>
						</Nav.Item>
					</>
					)}
					
				</Nav>
			</Navbar>

			<Navbar id='mobile-navbar' className='justify-content-between align-items-center'>
				<NavLink className='navbar-brand p-0 m-0' exact to='/'>Gr<span>estate</span></NavLink>

				<Nav activeKey='/home' className='align-items-center'>
					<Nav.Item>
						<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 mx-3' exact to='/'>Home</NavLink>
					</Nav.Item>

					<Nav.Item>
						<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 mx-3' exact to='/buy-properties'>Buy</NavLink>
					</Nav.Item>

					<Nav.Item>
						<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 mx-3' to='/rental-listings'>Rent</NavLink>
					</Nav.Item>

					<Nav.Item>
						<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 mx-3' to='/mortage-calculator'>Mortage Calculator</NavLink>
					</Nav.Item>

					<Nav.Item>
						<Button type='button' id='login-btn' className='shadow-none nav-link mx-3'>Login</Button>
					</Nav.Item>

					<Nav.Item>
						<Button type='button' id='signup-btn' className='shadow-none nav-link mx-3'>Sign up</Button>
					</Nav.Item>
				</Nav>
			</Navbar>

		</header >
	)
}

export default Header;
