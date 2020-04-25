import React from 'react';

import { throttleEvent } from '@helpers';

import jump from 'jump.js';

const ResetScroll = () => {

	const resetScroll = e => {

		jump('body', 1000);
		
		e.stopPropagation();
	}

	return (
		<div id='reset-scroll' className='d-none' data-scroll-enabled='true' onClick={throttleEvent(resetScroll, 1000)}>
			<button type='button' aria-label='reset scroll'><i className="fas fa-arrow-up"></i></button>
		</div>
	)
}

export default ResetScroll;
