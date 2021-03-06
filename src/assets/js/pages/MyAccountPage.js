import React, { useContext, useEffect, useReducer } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import AuthenticationReducer from '@reducers/AuthenticationReducer';
import RegexReducer from '@reducers/RegexReducer';
import {
  HANDLE_ACCOUNT_INPUT,
  SET_ACCOUNT_INPUTS,
  SET_REGEX_ALERT,
  RESET_REGEX_ALERT,
} from '@constants/actionTypes';

import Image from '@components/global_layout/Image';
import AuthLoader from '@components/authentication/AuthLoader';
import RegexAlert from '@components/global_layout/RegexAlert';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const MyAccountPage = () => {
  const {
    user_data,
    deleteUser,
    updateUser,
    auth_loader,
    authentication_regex,
  } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user_data) {
      // When the data fetch is completed get the user data and set it on the input values
      // Depends on the firebase servers how fast it fetches the data
      dispatch_account_state({ type: SET_ACCOUNT_INPUTS, payload: user_data });
    }
  }, [user_data]);

  const defaultAccountState = {
    last_name: '',
    first_name: '',
    address: '',
    city: '',
    age: '',
    gender: '',
    email: '',
    current_password: '',
    new_password: '',
  };

  const [account_state, dispatch_account_state] = useReducer(
    AuthenticationReducer,
    defaultAccountState,
  );

  const defaultRegexState = {
    last_name: undefined,
    first_name: undefined,
    age: undefined,
    city: undefined,
    current_password: undefined,
    confirm_password: undefined,
    global: undefined,
  };

  const [account_regex, dispatch_account_regex] = useReducer(
    RegexReducer,
    defaultRegexState,
  );

  const handleChange = (e) => {
    const { id } = e.target;

    // Remove the `account-` string from id and replace `-` with `_`
    const target = id.substring(id.indexOf('-') + 1).replace(/\-/g, '_');

    dispatch_account_state({
      type: HANDLE_ACCOUNT_INPUT,
      target,
      payload: e.target.value,
    });

    e.stopPropagation();
  };

  const manageUser = (e) => {
    const alert_danger = ['incorrect-validation', 'border-danger'];
    const inputs_available = document.querySelectorAll(
      'form[name="account-form"] .input-field',
    );
    const inputs_correct = document.querySelectorAll(
      'form[name="account-form"] .correct-validation',
    );

    dispatch_account_regex({
      type: RESET_REGEX_ALERT,
      payload: defaultRegexState,
    });

    if (e.target.id.includes('update')) {
      inputs_available.forEach((input) => {
        if (input.value.length === 0 && !input.id.includes('new-password'))
          input.classList.add(...alert_danger);
      });

      if (inputs_available.length === inputs_correct.length) {
        updateUser(account_state);
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target: 'global',
          payload: undefined,
        });

        dispatch_account_state({
          type: HANDLE_ACCOUNT_INPUT,
          target: 'current_password',
          payload: '',
        });
        dispatch_account_state({
          type: HANDLE_ACCOUNT_INPUT,
          target: 'new_password',
          payload: '',
        });
      } else {
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target: 'global',
          payload: 'All inputs are required',
        });

        setTimeout(
          () =>
            dispatch_account_regex({
              type: SET_REGEX_ALERT,
              target: 'global',
              payload: undefined,
            }),
          3000,
        );
      }
    }

    if (e.target.id.includes('delete')) {
      if (account_state.current_password.length > 0) {
        deleteUser(account_state.current_password);
      } else {
        document
          .getElementById('account-current-password')
          .classList.add(...alert_danger);

        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target: 'current_password',
          payload: 'You need to insert your password',
        });

        setTimeout(() => {
          document
            .getElementById('account-current-password')
            .classList.remove(...alert_danger);
        }, 3000);
      }
    }

    e.stopPropagation();
  };

  const myAccountRegex = (e) => {
    const { id, value, previousElementSibling } = e.target;

    // Remove the `signup-` string from id and replace `-` with `_`
    const target = e.target.id
      .substring(e.target.id.indexOf('-') + 1)
      .replace(/\-/g, '_');

    const isEmpty = value.length === 0;

    const regex = {
      name: /^[aA-zZ \-]{3,}$/g,
      age: /^\D$/g,
      gender: /^(male|female)$/gi,
      city: /^[aA-zZ]{3,}$/g,
      address: /^[\w\- ,.]{3,}$/g,
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z].{8,}$/,
    };

    const alert_danger = ['incorrect-validation', 'border-danger'];

    if (id.includes('name')) {
      if (!value.match(regex.name))
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `Invalid ${previousElementSibling.textContent}`,
        });

      if (isEmpty)
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `${previousElementSibling.textContent} is required`,
        });

      if (isEmpty || !value.match(regex.name)) {
        e.target.classList.remove('correct-validation');
        e.target.classList.add(...alert_danger);
      }

      if (!isEmpty && value.match(regex.name)) {
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: undefined,
        });

        e.target.classList.add('correct-validation');
        e.target.classList.remove(...alert_danger);
      }
    }

    if (id.includes('address')) {
      if (!value.match(regex.address))
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `Invalid ${previousElementSibling.textContent}`,
        });

      if (isEmpty)
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `${previousElementSibling.textContent} is required`,
        });

      if (isEmpty || !value.match(regex.address)) {
        e.target.classList.remove('correct-validation');
        e.target.classList.add(...alert_danger);
      }

      if (!isEmpty && value.match(regex.address)) {
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: undefined,
        });

        e.target.classList.add('correct-validation');
        e.target.classList.remove(...alert_danger);
      }
    }

    if (id.includes('city')) {
      if (!value.match(regex.city))
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `Invalid ${previousElementSibling.textContent}`,
        });

      if (isEmpty)
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `${previousElementSibling.textContent} is required`,
        });

      if (isEmpty || !value.match(regex.city)) {
        e.target.classList.remove('correct-validation');
        e.target.classList.add(...alert_danger);
      }

      if (!isEmpty && value.match(regex.city)) {
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: undefined,
        });

        e.target.classList.add('correct-validation');
        e.target.classList.remove(...alert_danger);
      }
    }

    if (id.includes('age')) {
      if (value.match(regex.age) || isEmpty)
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `Invalid age`,
        });

      if (parseFloat(value) < 18)
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: 'Must be over 18 years old',
        });
      if (parseFloat(value) > 100)
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: "Don't you think you are to old ?",
        });

      if (
        value.match(regex.age) ||
        parseFloat(value) < 18 ||
        parseFloat(value) > 100 ||
        isEmpty
      ) {
        e.target.classList.remove('correct-validation');
        e.target.classList.add(...alert_danger);
      } else {
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: undefined,
        });

        e.target.classList.add('correct-validation');
        e.target.classList.remove(...alert_danger);
      }
    }

    if (id.includes('email')) {
      if (!value.match(regex.email))
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `Invalid ${previousElementSibling.textContent}`,
        });

      if (isEmpty)
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `${previousElementSibling.textContent} is required`,
        });

      if (isEmpty || !value.match(regex.email)) {
        e.target.classList.remove('correct-validation');
        e.target.classList.add(...alert_danger);
      }

      if (!isEmpty && value.match(regex.email)) {
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: undefined,
        });

        e.target.classList.add('correct-validation');
        e.target.classList.remove(...alert_danger);
      }
    }

    if (target === 'current_password') {
      if (isEmpty) {
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: `${previousElementSibling.textContent} is required`,
        });

        e.target.classList.remove('correct-validation');
        e.target.classList.add(...alert_danger);
      } else {
        dispatch_account_regex({
          type: SET_REGEX_ALERT,
          target,
          payload: undefined,
        });

        e.target.classList.add('correct-validation');
        e.target.classList.remove(...alert_danger);
      }
    }

    if (target === 'new_password') {
      const div = document.createElement('div');

      // So we display only one error
      document.body.contains(
        document.querySelector('form[name="account-form"] .password-regex'),
      ) &&
        document
          .querySelector('form[name="account-form"] .password-regex')
          .remove();

      // Because is optional the new password, only if the user wants to change it
      if (isEmpty) {
        e.target.classList.remove(...alert_danger);
        e.target.classList.add('correct-validation');

        return;
      }

      if (!value.match(regex.password)) {
        div.classList.add(
          'my-2',
          'p-0',
          'bg-white',
          'text-center',
          'text-danger',
          'password-regex',
        );

        // Display what the password still needs to be secured
        div.innerHTML = `
					${
            value.length < 8
              ? `<p class='mb-3'>Password needs to contain at least 8 characters</p>`
              : ''
          }
					${
            !value.match(/\d{1,}/g)
              ? `<p class='mb-3'>Password needs to contain at least 1 number</p>`
              : ''
          }
					${
            !value.match(/[a-z]{1,}/g)
              ? `<p class='mb-3'>Password needs to contain at least 1 lowercase character</p>`
              : ''
          }
					${
            !value.match(/[A-Z]{1,}/g)
              ? `<p class='mb-3'>Password needs to contain at least 1 uppercase character</p>`
              : ''
          }
				`;

        // Insert the error
        e.target.parentElement.insertAdjacentElement('beforeend', div);

        e.target.classList.remove('correct-validation');
        e.target.classList.add(...alert_danger);
      } else {
        document.body.contains(
          document.querySelector('form[name="account-form"] .password-regex'),
        ) &&
          document
            .querySelector('form[name="account-form"] .password-regex')
            .remove();

        e.target.classList.remove(...alert_danger);
        e.target.classList.add('correct-validation');

        // Remove the password strength UI
        e.target.nextElementSibling.classList.remove('d-flex');
      }
    }
  };

  const passwordStrength = (e) => {
    const { nextElementSibling, value } = e.target;

    let password_strength = nextElementSibling.children[0];
    const password_length = value.length * 5;
    const classes = ['weak', 'medium', 'strong'];

    if (e.type === 'paste') e.preventDefault();
    else {
      // If the bar is filled
      if (password_length > 100) return;

      // So we always have one class displayed
      password_strength.classList.remove(...classes);

      if (password_length <= 25) password_strength.classList.add('weak');
      if (password_length >= 25 && password_length <= 70)
        password_strength.classList.add('medium');
      if (password_length >= 70) password_strength.classList.add('strong');

      password_strength.style.width = `${password_length}%`;
    }

    // Show again the password strength UI
    if (e.type === 'focus' && password_length > 0)
      e.target.nextElementSibling.classList.add('d-flex');

    e.stopPropagation();
  };

  if (user_data) {
    return (
      <main id='my-account'>
        <Container className='py-3'>
          <h1 className='text-center'>Personal Information</h1>
          <h6 className='m-0 text-center text-secondary font-italic'>
            Joined on {user_data.date_joined}
          </h6>

          <hr />

          <Form name='account-form'>
            <Form.Row className='mb-3'>
              <Form.Group as={Col} controlId='account-last-name'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  className='input-field correct-validation'
                  value={account_state.last_name}
                  onChange={handleChange}
                  onBlur={myAccountRegex}
                />

                {account_regex.last_name && (
                  <RegexAlert text={account_regex.last_name} danger={true} />
                )}
              </Form.Group>

              <Form.Group as={Col} controlId='account-first-name'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  className='input-field correct-validation'
                  value={account_state.first_name}
                  onChange={handleChange}
                  onBlur={myAccountRegex}
                />

                {account_regex.first_name && (
                  <RegexAlert text={account_regex.first_name} danger={true} />
                )}
              </Form.Group>
            </Form.Row>

            <Form.Row className='mb-3'>
              <Form.Group as={Col} controlId='account-address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  className='input-field correct-validation'
                  value={account_state.address}
                  onChange={handleChange}
                  onBlur={myAccountRegex}
                />

                {account_regex.address && (
                  <RegexAlert text={account_regex.address} danger={true} />
                )}
              </Form.Group>
            </Form.Row>

            <Form.Row className='mb-3'>
              <Form.Group as={Col} controlId='account-city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  className='input-field correct-validation'
                  value={account_state.city}
                  onChange={handleChange}
                  onBlur={myAccountRegex}
                />

                {account_regex.city && (
                  <RegexAlert text={account_regex.city} danger={true} />
                )}
              </Form.Group>

              <Form.Group as={Col} controlId='account-age' className='mb-4'>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type='text'
                  className='input-field correct-validation'
                  value={account_state.age}
                  onChange={handleChange}
                  onBlur={myAccountRegex}
                />

                {account_regex.age && (
                  <RegexAlert text={account_regex.age} danger={true} />
                )}
              </Form.Group>

              <Form.Group as={Col} controlId='account-gender' className='mb-4'>
                <Form.Label>Pick your gender</Form.Label>
                <Form.Control
                  as='select'
                  className='input-field correct-validation'
                  value={account_state.gender}
                  onChange={handleChange}
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row className='mb-3'>
              <Form.Group as={Col} controlId='account-email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  className='input-field correct-validation'
                  value={account_state.email}
                  onChange={handleChange}
                  onBlur={myAccountRegex}
                />

                {account_regex.email && (
                  <RegexAlert text={account_regex.email} danger={true} />
                )}
              </Form.Group>

              <Form.Group as={Col} controlId='account-current-password'>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type='password'
                  className='input-field'
                  value={account_state.current_password}
                  onChange={handleChange}
                  onBlur={myAccountRegex}
                />

                {account_regex.current_password && (
                  <RegexAlert
                    text={account_regex.current_password}
                    danger={true}
                  />
                )}
              </Form.Group>

              <Form.Group as={Col} controlId='account-new-password'>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type='password'
                  className='input-field correct-validation'
                  placeholder='Only if you want to change it'
                  value={account_state.new_password}
                  onChange={handleChange}
                  onBlur={myAccountRegex}
                  onInput={passwordStrength}
                  onPaste={passwordStrength}
                  onFocus={passwordStrength}
                />

                <div
                  className={`password-strength justify-content-start align-items-center ${
                    account_state.new_password.length > 0 ? 'mt-3 d-flex' : ''
                  }`}
                >
                  <div className='password-strength-bar'></div>

                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </Form.Group>
            </Form.Row>

            {authentication_regex && (
              <RegexAlert
                text={authentication_regex}
                danger={
                  authentication_regex.includes('successfully') ? false : true
                }
              />
            )}
            {account_regex.global && (
              <RegexAlert text={account_regex.global} danger={true} />
            )}

            <Form.Row
              className={`justify-content-center${
                account_regex.global || authentication_regex ? ' mt-4' : ''
              }`}
            >
              {auth_loader ? (
                <AuthLoader />
              ) : (
                <>
                  <button
                    id='update-account'
                    className='btn btn-dark w-25 px-3 py-2 mx-3'
                    type='button'
                    onClick={manageUser}
                    disabled={
                      authentication_regex &&
                      authentication_regex.includes('login attempts')
                        ? true
                        : false
                    }
                  >
                    Update account
                  </button>

                  <button
                    id='delete-account'
                    className='btn btn-danger w-25 px-3 py-2 mx-3'
                    type='button'
                    onClick={manageUser}
                    disabled={
                      authentication_regex &&
                      authentication_regex.includes('login attempts')
                        ? true
                        : false
                    }
                  >
                    Delete account
                  </button>
                </>
              )}
            </Form.Row>
          </Form>
        </Container>
      </main>
    );
  } else
    return (
      <main
        id='account-not-found'
        className='d-flex flex-column justify-content-center align-items-center'
      >
        <div className='p-3'>
          <h2 className='text-center mb-2'>You are not logged in</h2>
          <Image src='not-logged.png' />
        </div>
      </main>
    );
};

export default MyAccountPage;
