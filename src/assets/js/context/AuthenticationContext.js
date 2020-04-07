import React, { Component, createContext } from 'react';

export const AuthenticationContext = createContext();
export class AuthenticationContextProvider extends Component {

	state = {
		login_enabled: true,
		signup_enabled: false
	}

	toggleModal(e) {

		if(e.target.tagName === 'BUTTON') {

			if(e.target.textContent.toLowerCase().includes('login')) {
				
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
				socialAuthentication: this.socialAuthentication.bind(this)
			}}>
				{this.props.children}
			</AuthenticationContext.Provider>
		)
	}
}

export default AuthenticationContextProvider;
