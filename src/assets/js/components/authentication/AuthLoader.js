import React, { useContext } from 'react';

import { GlobalContext } from '@context/GlobalContext';

const AuthLoader = () => {

	const {

		getImage

	} = useContext(GlobalContext);

	return (
		<div className='auth-loader w-25 d-flex flex-column justify-content-center align-items-center'>
			<img src={getImage('auth-loader.svg')} alt='authentication loader' />
		</div>
	)
}

export default AuthLoader
