import React, { Component, createContext } from 'react'

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

		if(e.target.classList.contains('close-modal') || e.target.parentElement.classList.contains('close-modal') || e.target.id === 'authentication-modal') {
			
			this.setState(prevState => ({
				...prevState,
				login_enabled: false,
				signup_enabled: false
			}));
		}

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
				toggleModal: this.toggleModal.bind(this)
			}}>
				{this.props.children}
			</AuthenticationContext.Provider>
		)
	}
}

export default AuthenticationContextProvider;
