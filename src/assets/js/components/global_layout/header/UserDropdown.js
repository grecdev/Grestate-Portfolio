import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '@context/AuthenticationContext';

import { throttleEvent } from '@helpers';

import Button from 'react-bootstrap/Button';

const UserDropdown = () => {
  const { signOutAuth, user_data } = useContext(AuthenticationContext);

  const toggleDropdown = (e) => {
    const dropdown = e.target.nextElementSibling;

    if (!dropdown.classList.contains('dropdown-visible')) {
      dropdown.classList.add('dropdown-visible');
      document.body.contains(document.getElementById('contact-location')) &&
        (document.getElementById('contact-location').style.zIndex = '-1');
    } else {
      dropdown.classList.remove('dropdown-visible');
      document.body.contains(document.getElementById('contact-location')) &&
        (document.getElementById('contact-location').style.zIndex = '');
    }

    // When going to the my account page
    e.target.textContent.toLowerCase().includes('my account') &&
      document
        .getElementById('user-dropdown-menu')
        .classList.remove('dropdown-visible');

    e.stopPropagation();
  };

  return (
    <div id='user-dropdown' className='position-relative'>
      <i
        onClick={throttleEvent(toggleDropdown, 300)}
        className='fas fa-user'
      ></i>

      <div
        id='user-dropdown-menu'
        className='position-absolute d-flex flex-column justify-content-around align-items-center p-3'
      >
        <p className='m-0 text-white text-center'>{user_data.last_name}</p>
        <p className='mb-3 text-white text-center'>{user_data.first_name}</p>
        <p className='text-white'>{user_data.email}</p>
        <Link
          to='/my-account'
          className='text-white mb-3'
          onClick={toggleDropdown}
        >
          My Account
        </Link>
        <Button
          type='button'
          id='logout-btn'
          className='text-white border-0 shadow-none nav-link mx-3 w-100'
          onClick={signOutAuth}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default UserDropdown;
