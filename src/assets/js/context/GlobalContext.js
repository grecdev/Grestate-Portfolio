import React, { 
	
	createContext, 
	useEffect, 
	useReducer, 
	useState

} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import GlobalReducer from '@reducers/GlobalReducer';
import {

	CHANGE_LOCATION

} from '@constants/actionTypes';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

	const { children, location, history } = props;

	const defaultGlobalState = {
		location: undefined
	}

	const [state, dispatch]= useReducer(GlobalReducer, defaultGlobalState);
	
	const changePage = page => history.push(page);

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

	// Outer click for different elements, so we can close them
	const clickEvent = e => {

		if(!e.target.closest('#user-dropdown') && document.body.contains(document.getElementById('user-dropdown-menu'))) document.getElementById('user-dropdown-menu').classList.remove('dropdown-visible');

		e.stopPropagation();
	}

	const loadEvent = () => {
		
		setTimeout(() => {

			document.querySelector('html').classList.remove('overflow-hidden');
			document.getElementById('intro-loader').classList.add('hidden');

			setTimeout(() => document.getElementById('intro-loader').remove(), 300);

		}, 2500);
	}

	useEffect(() => {

		document.addEventListener('mousedown', clickEvent, true);
		window.addEventListener('scroll', scrollEvent, true);
		window.addEventListener('load', loadEvent, true);

		return () => {

			document.removeEventListener('click', clickEvent, true);
			window.removeEventListener('scroll', scrollEvent, true);
			window.removeEventListener('load', loadEvent, true);

		}

	}, []);

	useEffect(() => {

		dispatch({ type: CHANGE_LOCATION, payload: location.pathname });

		location.pathname !== '/' && document.body.classList.add('header-space');

		window.scrollTo(0, 0);

	}, [location.pathname]);

	return (
		<GlobalContext.Provider value={{
			...state,
			counter,
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
