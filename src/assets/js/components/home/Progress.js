import React, { useEffect, useContext } from 'react';

import SectionHeader from '@components/global_layout/SectionHeader';

import { GlobalContext } from '@context/GlobalContext';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Progress = () => {

	const { counter } = useContext(GlobalContext);

	const activateCounter = () => {

		let speed;
		let formattedStr;

		document.querySelectorAll('.counter').forEach(counter => {

			function recursive() {

				const incrementEnd = parseFloat(counter.dataset.incrementEnd);

				let current = counter.textContent.replace(/\,/g, '');
				current = parseFloat(counter.textContent);

				counter.dataset.incrementEnd.length > 3 ? speed = 100 : speed = 699;

				let incrementNum = Math.ceil(incrementEnd / speed);

				formattedStr = current + incrementNum;

				if (current < incrementEnd) {

					counter.textContent = formattedStr;

					setTimeout(recursive, 5);

				} else counter.textContent = incrementEnd.toLocaleString();
			}

			recursive();
		});
	}

	useEffect(() => {

		counter && activateCounter();
		
	}, [counter]);

	return (
		<section id='progress-counter'>

			<Container fluid className='py-5'>
				<SectionHeader title='Progress across the years' description={false} />

				<Row className='px-5'>
					<div className='text-center'>

						<i className="fas fa-users mb-3"></i>

						<h4 className='text-white'>Monthly users</h4>
						<p className='text-white h5 counter' data-increment-end='483724'>0</p>
					</div>

					<div className='text-center'>

						<i className="fas fa-home mb-3"></i>

						<h4 className='text-white'>Properties sold</h4>
						<p className='text-white h5 counter' data-increment-end='2345786'>0</p>
					</div>

					<div className='text-center'>

						<i className="fas fa-door-closed mb-3"></i>

						<h4 className='text-white'>Properties for rent</h4>
						<p className='text-white h5 counter' data-increment-end='13654'>0</p>
					</div>

					<div className='text-center'>

						<i className="fas fa-users mb-3"></i>

						<h4 className='text-white'>Cities Available</h4>
						<p className='text-white h5 counter' data-increment-end='102'>0</p>
					</div>
				</Row>
			</Container>
		</section>
	)
}

export default Progress;
