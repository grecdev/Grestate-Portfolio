import React, { Component, createContext } from 'react';

import { firebase_auth, firebase_db } from '../firebaseConfig';

export const AuthenticationContext = createContext();
export class AuthenticationContextProvider extends Component {

	state = {
		login_enabled: false,
		signup_enabled: false,
		user: {},
		auth_loader: false,
		user_data: {}
	}

	toggleModal(e) {

		// Clicking on the header links or buttons inside the modal
		if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {

			if(e.target.textContent.toLowerCase().replace(/ /g, '').includes('login')) {
				
				this.setState(prevState => ({
					...prevState,
					login_enabled: true,
					signup_enabled: false,
					auth_loader: false
				}));
			}

			if(e.target.textContent.toLowerCase().includes('sign up')) {

				this.setState(prevState => ({
					...prevState,
					login_enabled: false,
					signup_enabled: true,
					auth_loader: false
				}));
			}
		}

		if(e.target.classList.contains('close-modal') || e.target.parentElement.classList.contains('close-modal') || e.target.id === 'authentication-modal' || (e.currentTarget.tagName === 'A' && e.currentTarget.getAttribute('href').includes('forgot'))) {
			
			this.setState(prevState => ({
				...prevState,
				login_enabled: false,
				signup_enabled: false,
				auth_loader: false
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

	signUpAuth(data) {

		const {

			signup_first_name,
			signup_last_name,
			signup_email,
			signup_confirm_password,
			signup_age,
			signup_gender

		} = data;

		this.setState(prevState => ({ ...prevState, auth_loader: true }));

		firebase_auth.auth().createUserWithEmailAndPassword(signup_email, signup_confirm_password)
		.then(response => {

			firebase_db.collection('users').doc(response.user.uid).set({
				age: signup_age,
				gender: signup_gender
			})
			
			response.user.updateProfile({
				displayName: `${signup_last_name} ${signup_first_name}`
			});

			this.setState(prevState => ({ ...prevState, auth_loader: false }));
		})
		.catch(err => {

			setTimeout(() => this.setState(prevState => ({ ...prevState, auth_loader: false })), 500);
			console.log(err.message);
		});
	}

	loginAuth(email, password) {

		this.setState(prevState => ({ ...prevState, auth_loader: true }));
		
		firebase_auth.auth().signInWithEmailAndPassword(email, password)
		.then(user => {

			console.log('Remove login loader');
			console.log('User has logged in');

			this.setState(prevState => ({ ...prevState, auth_loader: false }));
		})
		.catch(error => {
			
			console.log('Remove login loader');

			setTimeout(() => this.setState(prevState => ({ ...prevState, auth_loader: false })), 500);
			console.log(error.message);
		});
	}

	signOutAuth() {
		
		firebase_auth.auth().signOut()
		.then(() => console.log('User signed out'))
		.catch(err => console.log(err));
	}

	authListener() {

		firebase_auth.auth().onAuthStateChanged(user => {

			if(user) {

				this.setState(prevState => ({ ...prevState, user }));

				// This will be used on the My account page
				firebase_db.collection('users').get()
				.then(res => {

					res.forEach(doc => {

						if(doc.exists && user.uid === doc.id) this.setState(prevState => ({ ...prevState, user_data: doc.data() }))
					})

				})
				.catch(err => console.log(err));

			}
			else this.setState(prevState => ({ ...prevState, user: null  }));
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
				signUpAuth: this.signUpAuth.bind(this),
				loginAuth: this.loginAuth.bind(this),
				signOutAuth: this.signOutAuth
			}}>
				{this.props.children}
			</AuthenticationContext.Provider>
		)
	}
}

export default AuthenticationContextProvider;
