"use strict";

import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/global_layout/Header';
import Footer from './components/global_layout/Footer';
import ResetScroll from './components/global_layout/ResetScroll';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const BuyPage = lazy(() => import('./components/pages/BuyPage'));
const MortageCalculatorPage = lazy(() => import('./components/pages/MortageCalculatorPage'));
const AboutPage = lazy(() => import('./components/pages/AboutPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

const App = () => {

	return (
		<>
			<Suspense fallback={<div><p>Loading...</p></div>} >
				<Header />

				<Switch>
					<Route exact strict path='/' component={HomePage} />
					<Route exact strict path='/buy-homes' component={BuyPage} />
					<Route exact strict path='/mortage-calculator' component={MortageCalculatorPage} />
					<Route exact strict path='/about' component={AboutPage} />
					<Route exact strict path='/contact' component={ContactPage} />

					<Route component={NotFoundPage} />
				</Switch>

				<ResetScroll />

				<Footer />
			</Suspense>
		</>
	)
}

export default App;