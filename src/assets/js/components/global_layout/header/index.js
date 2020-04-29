import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import UserDropdown from './UserDropdown';
import Image from '../Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const Header = () => {

	const {

		toggleModal,
		user_data

	} = useContext(AuthenticationContext);

	const {

		isMobile

	} = useContext(GlobalContext);

	const showMobileNavbar = e => {

		const target = e.currentTarget;
		const interval = 300;
		const mobile_menu = document.querySelector('.mobile-navbar-dropdown');
		const isNotEnabled = target.dataset.menuEnabled === 'false';

		if(isNotEnabled) {

			mobile_menu.classList.add('show-navbar');
			setTimeout(() => target.setAttribute('data-menu-enabled', 'true'), interval);
			
		} else {

			mobile_menu.classList.remove('show-navbar');
			setTimeout(() => target.setAttribute('data-menu-enabled', 'false'), interval);
		}

		e.stopPropagation();
	}

	return (
		<header onClick={toggleModal} >
			
			{!isMobile() ? (
				<Navbar id='desktop-navbar' className='justify-content-between align-items-center'>
					<NavLink className='navbar-brand p-0 m-0' exact to='/'>Gr<span>estate</span></NavLink>

					<Nav activeKey='/home' className='align-items-center'>
						<Nav.Item className='p-1 mx-3'>
							<NavLink activeClassName='page-active' className='nav-link p-0' exact to='/'>Home</NavLink>
						</Nav.Item>

						<Nav.Item className='p-1 mx-3'>
							<NavLink activeClassName='page-active' className='nav-link p-0' exact to='/buy-properties'>Buy</NavLink>
						</Nav.Item>

						<Nav.Item className='p-1 mx-3'>
							<NavLink activeClassName='page-active' className='nav-link p-0' exact to='/rental-listings'>Rent</NavLink>
						</Nav.Item>

						<Nav.Item className='p-1 mx-3'>
							<NavLink activeClassName='page-active' className='nav-link p-0' to='/mortage-calculator'>Mortage Calculator</NavLink>
						</Nav.Item>

						{ user_data ? <UserDropdown /> : (
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
			) : (
				<Navbar id='mobile-navbar' className='d-flex justify-content-between align-items-center'>
					<NavLink className='navbar-brand p-0 m-0' exact to='/'>Gr<span>estate</span></NavLink>

					<div className='d-flex justify-content-end align-items-center'>

						{ user_data && <UserDropdown />}

						<div 
							id="mobile-navbar-icon" 
							className='d-flex flex-column justify-content-center align-items-center'
							onClick={showMobileNavbar}
							data-menu-enabled='false'
						>
							<Image src='header-menu-dark.svg' />
						</div>
					</div>


					<Nav activeKey='/home' className='mobile-navbar-dropdown position-absolute d-flex flex-column align-items-stretch text-center px-2'>
						<Nav.Item>
							<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 my-3' exact to='/'>Home</NavLink>
						</Nav.Item>

						<Nav.Item>
							<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 my-3' exact to='/buy-properties'>Buy</NavLink>
						</Nav.Item>

						<Nav.Item>
							<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 my-3' exact to='/rental-listings'>Rent</NavLink>
						</Nav.Item>

						<Nav.Item>
							<NavLink activeClassName='page-active' className='nav-link p-1 pb-1 my-3' to='/mortage-calculator'>Mortage Calculator</NavLink>
						</Nav.Item>

						{ !user_data && (
						<>
							<Nav.Item>
								<Button type='button' id='login-btn' className='shadow-none nav-link my-3'>Login</Button>
							</Nav.Item>

							<Nav.Item>
								<Button type='button' id='signup-btn' className='shadow-none nav-link my-3'>Sign up</Button>
							</Nav.Item>
						</>
						)}
						
					</Nav>
				</Navbar>
			)
		}
		</header >
	)
}

export default Header;
