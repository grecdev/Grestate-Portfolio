import React from 'react';

import Image from '@components/global_layout/Image';

const AuthLoader = () => {

	return (
		<div className='auth-loader w-25 d-flex flex-column justify-content-center align-items-center'>
			<Image src='auth-loader.svg' />
		</div>
	)
}

export default AuthLoader
