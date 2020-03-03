import React, { Component, createContext } from 'react';

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {

	state = {
		test: 'test context'
	}

	getImage(image) {

		return require(`../../media/${image}`);
	}

	render() {

		const { getImage } = this;

		return (
			<GlobalContext.Provider value={{
				...this.state,
				getImage
			}}>
				{this.props.children}
			</GlobalContext.Provider>
		)
	}
}

export default GlobalContextProvider;
