import React, { useContext } from 'react';

import { GlobalContext } from '../../context/GlobalContext';

import jump from 'jump.js';

const ResetScroll = () => {

	const { throttle } = useContext(GlobalContext);

	const resetScroll = e => {

		if (e.currentTarget.id.includes('reset')) jump('body', { duration: 1000 });

		e.stopPropagation();
	}

	return (
		<div id='reset-scroll' className='d-none' onClick={throttle(resetScroll, 1000)}>
			<button type='button' aria-label='reset scroll'><i className="fas fa-arrow-up"></i></button>
		</div>
	)
}

export default ResetScroll;
