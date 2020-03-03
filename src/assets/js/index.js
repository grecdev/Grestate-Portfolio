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

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';

import GlobalContextProvider from './context/GlobalContext';

ReactDOM.render(
	<Router>
		<GlobalContextProvider>
			<App />
		</GlobalContextProvider>
	</Router>
	, document.getElementById('root'));
