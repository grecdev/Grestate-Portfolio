import React from 'react';

import Image from './Image';

const IntroLoader = () => {

	return (
		<div id='intro-loader' className='position-fixed w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
			<Image src='house-loader.gif' />
		</div>
	)
}

export default IntroLoader;