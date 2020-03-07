import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {

	const defaultGlobalState = {
		counterActive: false
	}

	const [state, setState] = useState(defaultGlobalState);

	const getImage = image => require(`../../media/${image}`);

	const counterAnimation = () => {

		const pos = window.pageYOffset;

		if (pos >= 1300) setState(prevState => ({ ...prevState, counterActive: true }));
		else {

			setState(prevState => ({ ...prevState, counterActive: false }));

			document.querySelectorAll('.counter').forEach(counter => counter.textContent = Math.ceil(counter.dataset.incrementEnd / 6))
		}
	}

	const scrollEvent = e => {

		counterAnimation();

		e.stopPropagation();
	}

	useEffect(() => {

		window.addEventListener('scroll', scrollEvent);

		return () => {

			window.removeEventListener('scroll', scrollEvent);

		}
	});

	return (
		<GlobalContext.Provider value={{
			...state,
			getImage
		}}>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalContextProvider;
