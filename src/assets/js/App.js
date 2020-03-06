"use strict";

import React, { useState, lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

// HUGE FILE
// import ReactMapGL from 'react-map-gl';

import Header from './components/global_layout/Header';
import Footer from './components/global_layout/Footer';

const HomePage = lazy(() => import('./components/pages/home/HomePage'));
import BuyPage from './components/pages/buy/BuyPage';

const App = () => {

	const [viewport, setViewport] = useState({
		width: 400,
		height: 400,
		latitude: 44.387863,
		longitude: 26.061243,
		zoom: 15
	});

	console.log(useLocation());

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
					<Route exact strict path='/buy' component={BuyPage} />

				</Switch>

				<Footer />
			</Suspense>
		</>
	)
}

export default App
