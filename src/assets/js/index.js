'use strict';

/* 
	For development:
	1. SASS > CSS
	2. CSS > JS
	3. JS > DOM

	For production:
	1. SASS > CSS
	2. CSS > CSS.min and link in html file
*/

import '../css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../css/style.scss';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';

// const GlobalContextProvider = lazy(() => import('@context/GlobalContext'));
import GlobalContextProvider from '@context/GlobalContext';
import FetchContextProvider from '@context/FetchContext';
import AuthenticationContextProvider from '@context/AuthenticationContext';

ReactDOM.render(
	<Router>
		{/* <Suspense fallback={<div>...Loading...</div>} > */}
			<GlobalContextProvider>
				<FetchContextProvider>
					<AuthenticationContextProvider>
						<App />
					</AuthenticationContextProvider>
				</FetchContextProvider>
			</GlobalContextProvider>
		{/* </Suspense> */}
	</Router>
	, document.getElementById('root'));
