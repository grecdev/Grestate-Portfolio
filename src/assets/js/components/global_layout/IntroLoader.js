import React from 'react';

import video_mp4 from '../../../media/house-loader.mp4';
import video_gif from '../../../media/house-loader.gif';

const IntroLoader = () => {

	return (
		<div id='intro-loader' className='position-fixed w-100 h-100 d-flex flex-column justify-content-center align-items-center'>

			<video autoPlay loop muted>
				<source src={video_mp4} type="video/mp4" />
				<source src={video_gif} type="video/gif" />
					Your browser does not support the video tag.
			</video>

		</div>
	)
}

export default IntroLoader;