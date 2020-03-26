import React, { useEffect, useReducer, createContext } from 'react';

export const FetchContext = createContext();

import FetchReducer from '../reducers/FetchReducer';
import {

	GET_DATABASE,
	FILTER_DATABASE,
	SET_LOADER

} from '../constants/actionTypes';

const FetchContextProvider = (props) => {

	const { children } = props;

	const defaultDatabaseState = {
		db: [],
		filtered_db: [],
		loader: false
	}

	const [state, dispatch] = useReducer(FetchReducer, defaultDatabaseState);

	const filterDatabase = data => {
		
		dispatch({ type: FILTER_DATABASE, payload: data });

		setTimeout(() => dispatch({ type: SET_LOADER, payload: false }), 700);
	}

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

	useEffect(() => {

		getXhr()
			.then(data => dispatch({ type: GET_DATABASE, payload: data }))
			.catch(err => console.log(err));

	}, []);

	return (

		<FetchContext.Provider value={{
			...state,
			filterDatabase
		}}>
			{children}
		</FetchContext.Provider>
	)
}

export default FetchContextProvider;