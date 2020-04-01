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

import '../css/style.scss';
import '../css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';

import GlobalContextProvider from '@context/GlobalContext';
import FetchContexTProvider from '@context/FetchContext';

ReactDOM.render(
	<Router>
		<GlobalContextProvider>
			<FetchContexTProvider>
				<App />
			</FetchContexTProvider>
		</GlobalContextProvider>
	</Router>
	, document.getElementById('root'));

// if (process.env.NODE_ENV !== 'production') {
// 	const {whyDidYouUpdate} = require('why-did-you-update');
// 	whyDidYouUpdate(React);
// }