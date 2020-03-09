import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

	const { children, location } = props;

	const initialGlobalState = {
		counterActive: false,
		throttleEnable: true
	}

	const [state, setState] = useState(initialGlobalState);

	const getImage = image => require(`../../media/${image}`);

	const throttle = (cb, interval) => {

		return function (...args) {

			if (!state.throttleEnable) return;

			setState(prevState => ({ ...prevState, throttleEnable: false }));

			cb.apply(this, args);

			setTimeout(() => setState(prevState => ({ ...prevState, throttleEnable: true })), interval)
		}
	}

	const counterAnimation = () => {

		const pos = window.pageYOffset;

		if (pos >= 1300) setState(prevState => ({ ...prevState, counterActive: true }));
		else {

			setState(prevState => ({ ...prevState, counterActive: false }));

			document.querySelectorAll('.counter').forEach(counter => counter.textContent = Math.ceil(counter.dataset.incrementEnd / 6))
		}
	}

	const resetScroll = () => {

		const pos = window.pageYOffset;

		if (pos >= 640) document.getElementById('reset-scroll').classList.remove('d-none');
		else document.getElementById('reset-scroll').classList.add('d-none');

		window.requestAnimationFrame(resetScroll);
	}

	const loadEvent = e => {


		e.stopPropagation();
	}

	document.addEventListener('DOMContentLoaded', loadEvent);

	const scrollEvent = e => {

		counterAnimation();
		resetScroll();

		e.stopPropagation();
	}


	useEffect(() => {

		window.addEventListener('scroll', scrollEvent);

		return () => {

			window.removeEventListener('scroll', scrollEvent);
			document.removeEventListener('DOMContentLoaded', loadEvent);

		}

	});

	useEffect(() => {

		location.pathname !== '/' && document.body.classList.add('header-space');

		window.scrollTo(0, 0);

	}, [location.pathname]);

	return (
		<GlobalContext.Provider value={{
			...state,
			location: location.pathname,
			getImage,
			throttle
		}}>
			{children}
		</GlobalContext.Provider>
	)
}

GlobalContextProvider.propTypes = {
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default withRouter(GlobalContextProvider);
