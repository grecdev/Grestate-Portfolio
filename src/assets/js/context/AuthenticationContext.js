import React, { Component, createContext } from 'react';

import { firebase_auth, firebase_db } from '../firebaseConfig';

export const AuthenticationContext = createContext();
export class AuthenticationContextProvider extends Component {

	state = {
		login_enabled: false,
		signup_enabled: false,
		auth_loader: false,
		user_data: {},
		unsubscribe: undefined,
		authentication_regex: undefined
	}

	toggleModal(e) {

		// Clicking on the header links or buttons inside the modal
		if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {

			if(e.target.textContent.toLowerCase().replace(/ /g, '').includes('login')) {
				
				this.setState({
					login_enabled: true,
					signup_enabled: false,
					auth_loader: false,
					authentication_regex: undefined
				});
			}

			if(e.target.textContent.toLowerCase().includes('sign up')) {

				this.setState({
					login_enabled: false,
					signup_enabled: true,
					auth_loader: false,
					authentication_regex: undefined
				});
			}
		}

		if(e.target.classList.contains('close-modal') || e.target.parentElement.classList.contains('close-modal') || e.target.id === 'authentication-modal' || (e.currentTarget.tagName === 'A' && e.currentTarget.getAttribute('href').includes('forgot'))) {
			
			this.setState({
				login_enabled: false,
				signup_enabled: false,
				auth_loader: false,
				authentication_regex: undefined
			});
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

	signUpAuth(signup_state) {

		this.setState({ auth_loader: true, authentication_regex: undefined});

		const date = new Date();

		const joined = {
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear(),
			time: date.toLocaleTimeString()
		}

		firebase_auth.auth().createUserWithEmailAndPassword(signup_state.email, signup_state.confirm_password)
		.then(response => {

			firebase_db.collection('users').doc(response.user.uid).set({
				first_name: signup_state.first_name,
				last_name: signup_state.last_name,
				age: signup_state.age,
				gender: signup_state.gender,
				city: signup_state.city,
				address: signup_state.address,
				email: signup_state.email,
				date_joined: `${joined.day}/${joined.month}/${joined.year} at ${joined.time}`
			});

			this.setState({ auth_loader: false, signup_enabled: false });
		})
		.catch(err => {

			err && this.setState({ authentication_regex: err.message, auth_loader: false });
			
		});
	}

	loginAuth(email, password) {

		this.setState({ auth_loader: true });
		
		firebase_auth.auth().signInWithEmailAndPassword(email, password)
		.then(user => {

			console.log('Remove login loader');
			console.log('User has logged in');

			this.setState({
				login_enabled: false,
				auth_loader: false
			});
		})
		.catch(err => {
		
			err && this.setState({ auth_loader: false });

			err.code.includes('wrong-password') && this.setState({ authentication_regex: 'The password is invalid' });
			err.code.includes('user-not-found') && this.setState({ authentication_regex: 'The user has not been found in our database' });
		});
	}

	signOutAuth() {

		this.state.unsubscribe();
		
		firebase_auth.auth().signOut()
		.then(() => console.log('User signed out'))
		.catch(err => console.log(err));

	}

	updateUser(data) {

		this.setState({ auth_loader: true, authentication_regex: undefined });

		const current_user = firebase_auth.auth().currentUser;

		const credentials = firebase.auth.EmailAuthProvider.credential(
			current_user.email,
			data.current_password
		);
		
		current_user.reauthenticateWithCredential(credentials).then(() => {
			
			// User re-authenticated.
			console.log('User re-authenticated');

			firebase_db.collection('users').doc(current_user.uid).update({
				first_name: data.first_name,
				last_name: data.last_name,
				age: data.age,
				gender: data.gender,
				city: data.city,
				address: data.address,
				email: data.email,
				date_joined: data.date_joined
			})
			.then(() => console.log('profile succesfully updated'))
			.catch(err => console.log(err));

			// Change email
			if(data.email.length > 0) {

				current_user.updateEmail(data.email).then(() => {
	
					this.setState({ auth_loader: false });
		
				}).catch(err => {
		
					err && this.setState({ auth_loader: false, authentication_regex: err.message});

				});
			}

			// Change password
			if(data.new_password.length > 0) {
				
				current_user.updatePassword(data.new_password).then(() => {
		
					this.setState({ auth_loader: false });
	
				}).catch(err => {

					err && this.setState({ auth_loader: false, authentication_regex: err.message});

				});
			}

			this.setState({ authentication_regex: 'Profile successfully updated', auth_loader: false });

			setTimeout(() => this.setState({ authentication_regex: undefined }), 3000);

		// Re-authentication failed	
		}).catch(err => {

			err && this.setState({ auth_loader: false });

			if(err.code.includes('wrong-password')) this.setState({ authentication_regex: 'The password is invalid' });

			if(err.code.includes('too-many-requests')) {

				this.setState({ authentication_regex: `${err.message.slice(0, err.message.length - 1)} in 15 seconds.`, auth_loader: false });

				setTimeout(() => this.setState({ authentication_regex: undefined }), 15000);
			}
		});
	}

	deleteUser(password) {

		const current_user = firebase_auth.auth().currentUser;

		const credentials = firebase.auth.EmailAuthProvider.credential(
			current_user.email,
			password
		);

		this.setState({ auth_loader: true, authentication_regex: undefined });
		
		current_user.reauthenticateWithCredential(credentials).then(() => {

			// User re-authenticated.

			firebase_db.collection("users").doc(current_user.uid).delete()
			.then(() => console.log("Document successfully deleted!"))
			.catch(err => console.error(err));
			
			current_user.delete()
			.then(() => {

				console.log('user succesfully deleted');

			})
			.catch(err => {

				console.log(err.message);
			});

			// An re-authentication error happened.
		}).catch(err => {

			if(err.code.includes('wrong-password')) this.setState({ authentication_regex: 'Wrong password', auth_loader: false });
			
			if(err.code.includes('too-many-requests')) {

				this.setState({ authentication_regex: `${err.message.slice(0, err.message.length - 1)} in 15 seconds.`, auth_loader: false });

				setTimeout(() => this.setState({ authentication_regex: undefined }), 15000);
			}
		});
	}

	authListener() {

		firebase_auth.auth().onAuthStateChanged(user => {

			if(user) {

				const unsubscribe = firebase_db.collection('users').doc(user.uid).onSnapshot(doc => {

					doc.exists && this.setState({ user_data: doc.data() });
		
				});

				this.setState({ unsubscribe });

			} else this.setState({ user_data: null });

		});
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
				signOutAuth: this.signOutAuth.bind(this),
				deleteUser: this.deleteUser.bind(this),
				updateUser: this.updateUser.bind(this)
			}}>
				{this.props.children}
			</AuthenticationContext.Provider>
		)
	}
}

export default AuthenticationContextProvider;
