import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const Header = () => {
	return (
		<header>
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

					<Nav.Item>
						<Button type='button' id='login-btn' className='shadow-none nav-link mx-3'>Login</Button>
					</Nav.Item>

					<Nav.Item>
						<Button type='button' id='signup-btn' className='shadow-none nav-link mx-3'>Sign up</Button>
					</Nav.Item>
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
