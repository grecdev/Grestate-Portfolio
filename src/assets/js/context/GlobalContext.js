import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import GlobalReducer from '../reducers/GlobalReducer';
import FetchReducer from '../reducers/FetchReducer';
import {

	GET_DATABASE,
	FILTER_DATABASE,
	TOGGLE_THROTTLE,
	SET_COUNTER

} from '../constants/actionTypes';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

	const { children, location, history } = props;

	const initialGlobalState = {
		counterActive: false,
		throttle: true,
		documentLoaded: false
	}

	const databaseState = {
		db: [],
		filtered_db: []
	}

	const [state, dispatchState]= useReducer(GlobalReducer, initialGlobalState)
	const [database, dispatchFetch] = useReducer(FetchReducer, databaseState);

	const getImage = image => require(`../../media/${image}`);
	const changePage = page => history.push(page);

	const throttle = (cb, interval) => function (...args) {

		if (!state.throttle) return;

		dispatchState({type: TOGGLE_THROTTLE, payload: false});

		cb.apply(this, args);

		setTimeout(() => dispatchState({type: TOGGLE_THROTTLE, payload: true}), interval);
	}

	const counterAnimation = () => {

		const pos = window.pageYOffset;
		if (pos >= 1300) dispatchState({type: SET_COUNTER, payload: true});
		else {

			dispatchState({type: SET_COUNTER, payload: false});

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

		}

	}, [location]);

	const getXhr = () => {

		return new Promise((resolve, reject) => {

			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'https://grecdev.github.io/json-api/properties.json', true);

			xhr.onload = () => {

				const response = JSON.parse(xhr.responseText);

				xhr.status >= 400 ? reject(response) : resolve(response);

			}

			xhr.onerror = () => reject('Some error occurred');

			xhr.send();

		});
	}

	const getFetch = () => {

		return new Promise((resolve, reject) => {

			fetch('https://grecdev.github.io/json-api/properties.json')
				.then(errorHandling)
				.then(data => resolve(data))
				.catch(err => reject(err))

			function errorHandling(response) {

				if (!response.ok) throw Error(response.statusText)

				return response.json();
			}
		});
	}

	const getAjax = async () => {

		const response = await fetch('https://grecdev.github.io/json-api/properties.json');
		const data = await response.json();

		return data;
	}

	const filterDatabase = data => dispatchFetch({type: FILTER_DATABASE, payload: data });

	useEffect(() => {

		getXhr()
			.then(data => dispatchFetch({ type: GET_DATABASE, payload: data }))
			.catch(err => console.log(err));

	}, []);

	useEffect(() => {

		location.pathname !== '/' && document.body.classList.add('header-space');

		window.scrollTo(0, 0);

	}, [location.pathname]);

	return (
		<GlobalContext.Provider value={{
			...state,
			...database,
			location: location.pathname,
			getImage,
			throttle,
			disableLetters,
			changePage,
			filterDatabase
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
