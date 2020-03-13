"use strict";

import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

// HUGE FILE
// import ReactMapGL from 'react-map-gl';

import Header from './components/global_layout/Header';
import Footer from './components/global_layout/Footer';
import ResetScroll from './components/global_layout/ResetScroll';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const AboutPage = lazy(() => import('./components/pages/AboutPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

const App = () => {

	const [viewport, setViewport] = useState({
		width: 400,
		height: 400,
		latitude: 44.387863,
		longitude: 26.061243,
		zoom: 15
	});

	return (
		<>
			<Suspense fallback={<div><p>Loading...</p></div>} >
				{/* <ReactMapGL
				{...viewport}
				onViewportChange={setViewport}
				mapboxApiAccessToken={process.env.MAP_KEY}
			/> */}
				<Header />

				<Switch>
					<Route exact strict path='/' component={HomePage} />
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

export default App
