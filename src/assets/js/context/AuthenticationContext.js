import React, { Component, createContext } from 'react';

import fire_auth from '../FireAuth';

export const AuthenticationContext = createContext();
export class AuthenticationContextProvider extends Component {

	state = {
		login_enabled: true,
		signup_enabled: false,
		user: {},
		auth_loader: false
	}

	toggleModal(e) {

		// Clicking on the header links or buttons inside the modal
		if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {

			if(e.target.textContent.toLowerCase().replace(/ /g, '').includes('login')) {
				
				this.setState(prevState => ({
					...prevState,
					login_enabled: true,
					signup_enabled: false
				}));
			}

			if(e.target.textContent.toLowerCase().includes('sign up')) {

				this.setState(prevState => ({
					...prevState,
					login_enabled: false,
					signup_enabled: true
				}));
			}
		}

		if(e.target.classList.contains('close-modal') || e.target.parentElement.classList.contains('close-modal') || e.target.id === 'authentication-modal' || (e.currentTarget.tagName === 'A' && e.currentTarget.getAttribute('href').includes('forgot'))) {
			
			this.setState(prevState => ({
				...prevState,
				login_enabled: false,
				signup_enabled: false
			}));
		}

		e.stopPropagation();
	}

	socialAuthentication(e) {

		const width = 570;
		const height = 520;
		const y = window.top.outerHeight / 2 + window.top.screenY - ( width / 2);
    const x = window.top.outerWidth / 2 + window.top.screenX - ( height / 2);

		const auth = {
			facebook_url: 'https://www.facebook.com',
			google_url: 'https://accounts.google.com/servicelogin/signinchooser?flowName=GlifWebSignIn&flowEntry=ServiceLogin',
			features: `location=yes,height=570,width=520,scrollbars=yes,status=yes, top=${y}, left=${x}`
		}

		if(e.currentTarget.className.includes('facebook')) window.open(auth.facebook_url, '_blank', auth.features);
		if(e.currentTarget.className.includes('google')) window.open(auth.google_url, '_blank', auth.features);

		e.stopPropagation();
	}

	signUpAuth(email, password) {

		console.log('Sign up loader');

		fire_auth.auth().createUserWithEmailAndPassword(email, password)
		.then(user => {

			console.log('Remove signup loader');
			console.log('Succesfully registered');
		})
		.catch(err => console.log(err.message));
	}

	loginAuth(email, password) {

		this.setState(prevState => ({ ...prevState, auth_loader: true }));
		
		fire_auth.auth().signInWithEmailAndPassword(email, password)
		.then(user => {

			this.setState(prevState => ({ ...prevState, auth_loader: false }));
			console.log('Remove login loader');
			console.log('User has logged in');
		})
		.catch(error => {
			
			setTimeout(() => this.setState(prevState => ({ ...prevState, auth_loader: false })), 500);
			console.log('Remove login loader');
			console.log(error.message);
		});
	}

	signOutAuth() {
		
		fire_auth.auth().signOut()
		.then(() => console.log('User signed out'))
		.catch(err => console.log(err));
	}

	authListener() {

		fire_auth.auth().onAuthStateChanged(user => {

			if(user) {

				this.setState(prevState => ({ ...prevState, user: user }));

				this.setState(prevState => ({
					...prevState,
					login_enabled: false,
					signup_enabled: false
				}));

			} else this.setState(prevState => ({ ...prevState, user: null  }));
		})
	}

	componentDidMount() {

		this.authListener();
	}

	componentDidUpdate(prevState) {

		if(prevState.login_enabled !== this.state.login_enabled || prevState.signup_enabled !== this.state.signup_enabled) {

			if(this.state.login_enabled || this.state.signup_enabled) document.body.classList.add('overflow-hidden');
			else document.body.classList.remove('overflow-hidden');
		}
	}

	render() {

		return (
			<AuthenticationContext.Provider value={{
				...this.state,
				toggleModal: this.toggleModal.bind(this),
				socialAuthentication: this.socialAuthentication,
				authListener: this.authListener.bind(this),
				signUpAuth: this.signUpAuth,
				loginAuth: this.loginAuth.bind(this),
				signOutAuth: this.signOutAuth
			}}>
				{this.props.children}
			</AuthenticationContext.Provider>
		)
	}
}

export default AuthenticationContextProvider;
