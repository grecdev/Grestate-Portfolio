import React, { useEffect, useReducer, createContext, useContext } from 'react';

import { GlobalContext } from '@context/GlobalContext';

export const FetchContext = createContext();
import FetchReducer from '@reducers/FetchReducer';
import {

	GET_DATABASE,
	SET_BUY_PROPERTIES,
	SET_RENTAL_PROPERTIES,
	RESET_BUY_PROPERTIES,
	RESET_RENTAL_PROPERTIES,
	SET_LOADER

} from '@constants/actionTypes';

const FetchContextProvider = (props) => {

	const { children } = props;

	const { location } = useContext(GlobalContext);

	const defaultDatabaseState = {
		db: [],
		buy_properties: [],
		rent_properties: [],
		loader: false
	}

	const [state, dispatch] = useReducer(FetchReducer, defaultDatabaseState);

	// When we search from the form
	const searchProperty = (data, target) => {
		
		target.name.includes('buy') && dispatch({ type: SET_BUY_PROPERTIES, payload: data });
		target.name.includes('rent') && dispatch({ type: SET_RENTAL_PROPERTIES, payload: data });

		setTimeout(() => dispatch({ type: SET_LOADER, payload: false }), 700);
	}

	// When we apply some filters on search property page
	const filterProperty = (data, location) => {

		if(location.includes('buy')) dispatch({ type: SET_BUY_PROPERTIES, payload: data });
		if(location.includes('rent')) dispatch({ type: SET_RENTAL_PROPERTIES, payload: data });

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

	useEffect(() => {

		if(location !== undefined) {

			if(!location.includes('buy')) dispatch({ type: RESET_BUY_PROPERTIES }); 
			if(!location.includes('rent')) dispatch({ type: RESET_RENTAL_PROPERTIES });
		}

	}, [location]);

	return (

		<FetchContext.Provider value={{
			...state,
			searchProperty,
			filterProperty
		}}>
			{children}
		</FetchContext.Provider>
	)
}

export default FetchContextProvider;