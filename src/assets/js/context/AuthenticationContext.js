import React, { Component, createContext } from 'react';

import { firebase_auth, firebase_db } from '../firebaseConfig';

export const AuthenticationContext = createContext();
export class AuthenticationContextProvider extends Component {

	state = {
		login_enabled: false,
		signup_enabled: false,
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

		this.setState(prevState => ({ ...prevState, auth_loader: true }));

		const date = new Date();

		const joined = {
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear(),
			time: date.toLocaleTimeString()
		}

		firebase_auth.auth().createUserWithEmailAndPassword(data.email, data.confirm_password)
		.then(response => {

			firebase_db.collection('users').doc(response.user.uid).set({
				first_name: data.first_name,
				last_name: data.last_name,
				age: data.age,
				gender: data.gender,
				city: data.city,
				address: data.address,
				email: data.email,
				date_joined: `${joined.day}/${joined.month}/${joined.year} at ${joined.time}`
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

			this.setState(prevState => ({ ...prevState, login_enabled: false }));
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

	deleteUser() {

		firebase_db.collection("users").doc(this.state.uid).delete()
		.then(() => console.log("Document successfully deleted!"))
		.catch(err => console.error(err));
		
		firebase_auth.auth().currentUser.delete()
		.then(() => {

			console.log('user succesfully deleted');
		})
		.catch(err => {

			console.log(err.message);
		});
	}

	updateUser(data) {

		this.setState(prevState => ({ ...prevState, auth_loader: true }));

		const current_user = firebase_auth.auth().currentUser;

		if(data.current_password.length > 0) {

			const credentials = firebase.auth.EmailAuthProvider.credential(
				current_user.email, 
				data.current_password
			);
			
			current_user.reauthenticateWithCredential(credentials).then(() => {
				
				// User re-authenticated.
				console.log('User re-authenticated');
	
				// Change email
				if(data.email.length > 0) {
	
					current_user.updateEmail(data.email).then(() => {
		
						console.log('Email succesfully changed');
		
						this.setState(prevState => ({ ...prevState, auth_loader: false }));
			
					}).catch(err => {
			
						console.log(err);
		
						setTimeout(() => this.setState(prevState => ({ ...prevState, auth_loader: false })), 500);
					});
				}
	
				// Change password
				if(data.new_password.length > 0) {
					
					current_user.updatePassword(new_password).then(() => {
		
						console.log('Password changed');
			
						this.setState(prevState => ({ ...prevState, auth_loader: false }));
		
					}).catch(err => {
	
						console.log(err);
		
						setTimeout(() => this.setState(prevState => ({ ...prevState, auth_loader: false })), 500);
					});
				}
	
			}).catch(err => {
	
				// Re-authentication failed
				console.log(err.message);
			});
		}

		firebase_db.collection('users').doc(current_user.uid).set({
			first_name: data.first_name,
			last_name: data.last_name,
			age: data.age,
			gender: data.gender,
			city: data.city,
			address: data.address,
			email: data.email,
			date_joined: data.date_joined
		})
		.then(() => {

			console.log('profile succesfully updated');
			this.setState(prevState => ({ ...prevState, auth_loader: false }));
		})
		.catch(err => {

			console.log(err);
		})
	}

	authListener() {

		firebase_auth.auth().onAuthStateChanged(user => {

			console.log(user);

			if(user) {

				// This will be used on the My account page
				firebase_db.collection('users').onSnapshot(res => {

					res.forEach(doc => {

						if(doc.exists && user.uid === doc.id) this.setState(prevState => ({ ...prevState, user_data: doc.data() }))
					})

				})

			} else this.setState(prevState => ({ ...prevState, user_data: null  }));
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
				signOutAuth: this.signOutAuth,
				deleteUser: this.deleteUser.bind(this),
				updateUser: this.updateUser.bind(this)
			}}>
				{this.props.children}
			</AuthenticationContext.Provider>
		)
	}
}

export default AuthenticationContextProvider;
