"use strict";

import React, { lazy, Suspense, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { AuthenticationContext } from '@context/AuthenticationContext';

import Header from '@components/global_layout/header';
import Footer from '@components/global_layout/Footer';
import ResetScroll from '@components/global_layout/ResetScroll';

const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPropertyPage = lazy(() => import('./pages/SearchPropertyPage'));
const MortageCalculatorPage = lazy(() => import('./pages/MortageCalculatorPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PropertyPage = lazy(() => import('./pages/PropertyPage'));

import AuthenticationModal from '@components/authentication/AuthenticationModal';

const App = () => {

	const {

		login_enabled,
		signup_enabled

	} = useContext(AuthenticationContext);

	return (
		<>
			<Suspense fallback={<div><p>Loading...</p></div>} >
				<Header />

				<Switch>
					<Route exact strict path='/' component={HomePage} />
					<Route exact strict path='/buy-properties' component={SearchPropertyPage} />
					<Route exact strict path='/rental-listings' component={SearchPropertyPage} />
					<Route exact strict path='/mortage-calculator' component={MortageCalculatorPage} />
					<Route exact strict path='/about' component={AboutPage} />
					<Route exact strict path='/contact' component={ContactPage} />
					<Route exact strict path='/buy-properties/:house' component={PropertyPage} />
					<Route exact strict path='/rental-listings/:house' component={PropertyPage} />

					<Route component={NotFoundPage} />
				</Switch>

				{ login_enabled || signup_enabled ? <AuthenticationModal /> : null }

				<ResetScroll />

				<Footer />
			</Suspense>
		</>
	)
}

export default App;