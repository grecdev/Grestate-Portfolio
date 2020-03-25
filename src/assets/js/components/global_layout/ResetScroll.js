import React from 'react';

import jump from 'jump.js';

const ResetScroll = () => {

	const resetScroll = e => {

		const target = e.currentTarget;
		const enabled = e.currentTarget.dataset.scrollEnabled === 'true';
		const smoothTime = 1000;

		if (target.id.includes('reset') && enabled) {

			jump('body', smoothTime);

			target.setAttribute('data-scroll-enabled', 'false');

			setTimeout(() => target.setAttribute('data-scroll-enabled', 'true'), smoothTime);
		}

		e.stopPropagation();
	}

	return (
		<div id='reset-scroll' className='d-none' data-scroll-enabled='true' onClick={resetScroll}>
			<button type='button' aria-label='reset scroll'><i className="fas fa-arrow-up"></i></button>
		</div>
	)
}

export default ResetScroll;
