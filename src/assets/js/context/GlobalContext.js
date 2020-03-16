import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

	const { children, location } = props;

	const initialGlobalState = {
		counterActive: false,
		throttleEnable: true,
		documentLoaded: false
	}

	const [state, setState] = useState(initialGlobalState);

	const getImage = image => require(`../../media/${image}`);

	const throttle = (cb, interval) => {

		return function (...args) {

			if (!state.throttleEnable) return;

			setState(prevState => ({ ...prevState, throttleEnable: false }));

			cb.apply(this, args);

			setTimeout(() => setState(prevState => ({ ...prevState, throttleEnable: true })), interval)
		}
	}

	const counterAnimation = () => {

		const pos = window.pageYOffset;

		if (pos >= 1300) setState(prevState => ({ ...prevState, counterActive: true }));
		else {

			setState(prevState => ({ ...prevState, counterActive: false }));

			document.querySelectorAll('.counter').forEach(counter => counter.textContent = Math.ceil(counter.dataset.incrementEnd / 6))
		}
	}

	const resetScroll = () => {

		const pos = window.pageYOffset;

		if (pos >= 640) document.getElementById('reset-scroll').classList.remove('d-none');
		else document.getElementById('reset-scroll').classList.add('d-none');

		window.requestAnimationFrame(resetScroll);
	}

	const scrollEvent = e => {

		counterAnimation();
		resetScroll();

		e.stopPropagation();
	}

	const disableLetters = e => {

		/*
			Numpad + normal keyboard numbers
			+ && - and parentheses
			Space && Ctrl + a && Backspace
			dot
			arrow keys
			Tab
		*/

		// Disable shift
		if(e.shiftKey) e.preventDefault();

		const availableCharacters = e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105 || e.which === 189 || e.which === 187 || e.which === 8 || e.which === 32 || e.which === 17 || e.which === 107 || e.which === 109 || e.ctrlKey || e.which === 190 || e.which === 110 || e.which >= 37 && e.which <= 40 || e.which === 9 || e.which === 123 || e.which === 116 || e.which === 191 || e.which === 188

		if(availableCharacters) return true
		else e.preventDefault()

		e.stopPropagation();
	}

	useEffect(() => {

		window.addEventListener('scroll', scrollEvent);

		return () => {

			window.removeEventListener('scroll', scrollEvent);
			document.removeEventListener('DOMContentLoaded', loadEvent);

		}

	}, []);

	useEffect(() => {

		location.pathname !== '/' && document.body.classList.add('header-space');

		window.scrollTo(0, 0);

	}, [location.pathname]);

	return (
		<GlobalContext.Provider value={{
			...state,
			location: location.pathname,
			getImage,
			throttle,
			disableLetters
		}}>
			{children}
		</GlobalContext.Provider>
	)
}

GlobalContextProvider.propTypes = {
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default withRouter(GlobalContextProvider);
