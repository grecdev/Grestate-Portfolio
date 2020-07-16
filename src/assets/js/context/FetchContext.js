import React, { useEffect, useReducer, createContext, useContext } from 'react';

export const FetchContext = createContext();

import { GlobalContext } from '@context/GlobalContext';

import FetchReducer from '@reducers/FetchReducer';
import {
  GET_DATABASE,
  SET_BUY_PROPERTIES,
  SET_RENTAL_PROPERTIES,
  FILTER_BUY_PROPERTIES,
  FILTER_RENTAL_PROPERTIES,
  SET_LOADER,
} from '@constants/actionTypes';

const FetchContextProvider = (props) => {
  const { children } = props;

  const { location } = useContext(GlobalContext);

  const defaultDatabaseState = {
    db: [],
    buy_properties: [],
    rent_properties: [],
    filtered_buy_properties: [],
    filtered_rent_properties: [],
    loader: false,
  };

  const [state, dispatch] = useReducer(FetchReducer, defaultDatabaseState);

  // When we search from the form
  const searchProperty = (data, target) => {
    dispatch({ type: SET_LOADER, payload: true });

    target.name.includes('buy') &&
      dispatch({ type: SET_BUY_PROPERTIES, payload: data });
    target.name.includes('rent') &&
      dispatch({ type: SET_RENTAL_PROPERTIES, payload: data });

    dispatch({ type: FILTER_BUY_PROPERTIES, payload: [] });
    dispatch({ type: FILTER_RENTAL_PROPERTIES, payload: [] });

    setTimeout(() => dispatch({ type: SET_LOADER, payload: false }), 700);
  };

  // When we apply some filters on search property page
  const filterProperty = (data, location) => {
    dispatch({ type: SET_LOADER, payload: true });

    if (location.includes('buy'))
      dispatch({ type: FILTER_BUY_PROPERTIES, payload: data });
    if (location.includes('rent'))
      dispatch({ type: FILTER_RENTAL_PROPERTIES, payload: data });

    setTimeout(() => dispatch({ type: SET_LOADER, payload: false }), 700);
  };

  const getXhr = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        'GET',
        'https://grecdev.github.io/json-api/properties.json',
        true,
      );

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);

        xhr.status >= 400 ? reject(response) : resolve(response);
      };

      xhr.onerror = () => reject('Some error occurred');

      xhr.send();
    });
  };

  const getFetch = () => {
    return new Promise((resolve, reject) => {
      fetch('https://grecdev.github.io/json-api/properties.json')
        .then(errorHandling)
        .then((data) => resolve(data))
        .catch((err) => reject(err));

      function errorHandling(response) {
        if (!response.ok) throw Error(response.statusText);

        return response.json();
      }
    });
  };

  const getAjax = async () => {
    const response = await fetch(
      'https://grecdev.github.io/json-api/properties.json',
    );
    const data = await response.json();

    return data;
  };

  useEffect(() => {
    getXhr()
      .then((data) => dispatch({ type: GET_DATABASE, payload: data }))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (location !== undefined) {
      dispatch({ type: SET_LOADER, payload: false });

      // So when change between these 2 pages clear the filtered array
      // So it won't show the buy properties on rent page or vice-versa
      if (location.includes('buy')) {
        dispatch({ type: SET_RENTAL_PROPERTIES, payload: [] });
        dispatch({ type: FILTER_RENTAL_PROPERTIES, payload: [] });
      }

      if (location.includes('rental')) {
        dispatch({ type: SET_BUY_PROPERTIES, payload: [] });
        dispatch({ type: FILTER_BUY_PROPERTIES, payload: [] });
      }
    }
  }, [location]);

  return (
    <FetchContext.Provider
      value={{
        ...state,
        searchProperty,
        filterProperty,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

FetchContextProvider.whyDidYouRender = true;

export default FetchContextProvider;
