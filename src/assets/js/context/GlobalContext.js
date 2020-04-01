import React, { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import GlobalReducer from '@reducers/GlobalReducer';
import {

	TOGGLE_THROTTLE,
	CHANGE_LOCATION

} from '@constants/actionTypes';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

	const { children, location, history } = props;

	const defaultGlobalState = {
		throttle: true,
		location: undefined
	}

	const [state, dispatch]= useReducer(GlobalReducer, defaultGlobalState)
	
	const getImage = image => require(`../../media/${image}`);
	const changePage = page => history.push(page);

	const throttleEvent = (cb, interval) => function (...args) {

		if (!state.throttle) return;

		dispatch({type: TOGGLE_THROTTLE, payload: false });

		cb.apply(this, args);

		setTimeout(() => dispatch({type: TOGGLE_THROTTLE, payload: true}), interval);
	}

	const [counter, setCounter] = useState(false);

	const counterAnimation = () => {

		if (window.pageYOffset >= 1350) setCounter(true);
		else {

			setCounter(false);
			document.querySelectorAll('.counter').forEach(counter => counter.textContent = Math.ceil(counter.dataset.incrementEnd / 6));

		}
	}

	const resetScroll = () => {

		if (window.pageYOffset >= 640) document.getElementById('reset-scroll').classList.remove('d-none');
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

		window.addEventListener('scroll', scrollEvent, true);

		return () => window.removeEventListener('scroll', scrollEvent);

	}, []);

	useEffect(() => {

		location.pathname !== '/' && document.body.classList.add('header-space');

		window.scrollTo(0, 0);

		dispatch({type: CHANGE_LOCATION, payload: location.pathname });

	}, [location.pathname]);

	return (
		<GlobalContext.Provider value={{
			...state,
			counter,
			getImage,
			throttleEvent,
			disableLetters,
			changePage,
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
