import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { throttleEvent } from '@helpers';

import SectionHeader from '@components/global_layout/SectionHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Testimonial = () => {
	
	const defaultCarouselState = {
		boxWidth: 0,
		startPos: 0,
		endPos: 0
	}

	const [carouselState, setCarouselState] = useState(defaultCarouselState);

	const testimonialDb = [
		{
			id: 1,
			feedback: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!',
			name: 'Elif Mathews',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!',
			avatar: require('../../../media/avatar-1.jpg')
		},
		{
			id: 2,
			feedback: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!',
			name: 'Dru Wood',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!',
			avatar: require('../../../media/avatar-2.jpg')
		},
		{
			id: 3,
			feedback: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!',
			name: 'Willem Lugo',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!',
			avatar: require('../../../media/avatar-3.jpg')
		},
		{
			id: 4,
			feedback: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!',
			name: 'Borys Redmond',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!',
			avatar: require('../../../media/avatar-4.jpg')
		},
		{
			id: 5,
			feedback: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum repellendus, eos animi illum hic cupiditate voluptatum eum veniam commodi!',
			name: 'Tashan Barr',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, modi!',
			avatar: require('../../../media/avatar-5.jpg')
		}
	];

	const changeSlides = e => {

		let direction;

		if (e.type === 'click') {

			document.querySelectorAll('.testimonial-box').forEach((box, index) => {

				box.classList.remove('draggable-transition');
				box.classList.add('click-transition');

				const currentPos = parseFloat(box.style.transform.replace(/(?![\.\-])(\D)/g, ''));

				if (e.target.classList.contains('left-arrow') || e.target.parentElement.classList.contains('left-arrow')) direction = currentPos - carouselState.boxWidth;
				if (e.target.classList.contains('right-arrow') || e.target.parentElement.classList.contains('right-arrow')) direction = currentPos + carouselState.boxWidth;

				box.style.transform = `translateX(${direction}px)`;

				if (currentPos === carouselState.startPos && (e.target.classList.contains('left-arrow') || e.target.parentElement.classList.contains('left-arrow'))) {

					box.style.transition = 'none';
					box.style.transform = `translateX(${carouselState.endPos}px)`;

					setTimeout(() => box.style.transition = '', 300);
				}

				if (currentPos === carouselState.endPos && (e.target.classList.contains('right-arrow') || e.target.parentElement.classList.contains('right-arrow'))) {
					box.style.transition = 'none';
					box.style.transform = `translateX(${carouselState.startPos}px)`;

					setTimeout(() => box.style.transition = '', 300);
				}
			});
		}

		e.stopPropagation();
	}

	const displayTestimonial = width => document.querySelectorAll('.testimonial-box').forEach((box, index) => {

		box.style.transition = 'none';
		box.style.transform = `translateX(${width * (index - 1)}px)`;

		setTimeout(() => box.style.transition = '', 1);

		const currentPos = Math.round(parseFloat(box.style.transform.match(/[\d\-]/g, '').join('')));

		currentPos < 0 && setCarouselState(prevState => ({ ...prevState, startPos: currentPos }));

		index === document.querySelectorAll('.testimonial-box').length - 1 && setCarouselState(prevState => ({ ...prevState, endPos: currentPos }));

	});

	useEffect(() => {

		const boxMargins = parseFloat(window.getComputedStyle(document.querySelector('.testimonial-box')).getPropertyValue('margin-left'));
		const width = Math.floor(document.querySelector('.testimonial-box').getBoundingClientRect().width + boxMargins);

		setCarouselState(prevState => ({ ...prevState, boxWidth: width }));

		displayTestimonial(width);

	}, []);

	return (
		<section id='testimonial' className='py-5'>
			<SectionHeader title='What people say about us' description={true} />

			<Container fluid>
				<Row className='p-0 position-relative flex-column align-items-center'>

					<div className='mb-4 d-flex justify-content-between align-items-center'>
						{testimonialDb.map((user, index) => (
							<div
								key={user.id}
								className='testimonial-box p-4 rounded position-absolute'
								data-index={index}
							>
								<div className="testimonial-box-review mb-4">
									<p>{user.feedback}</p>
								</div>

								<div className="testimonial-box-profile d-flex align-items-center">
									<picture>
										<source srcSet={user.avatar} type='image/jpeg' />
										<source srcSet={user.avatar} type='image/webp' />

										<img src={user.avatar} alt='avatar' className='mr-3' />
									</picture>

									<div className='d-flex flex-column'>
										<span className='font-weight-bold'>{user.name}</span>
										<span className='font-italic'>{user.description}</span>
									</div>
								</div>
							</div>
						))}
					</div>

					<div onClick={throttleEvent(changeSlides, 500)} className='d-flex flex-row justify-content-between'>
						<button key={uuidv4()} aria-label='left arrow' className='left-arrow slide-button rounded-circle shadow-none mx-2' type='button'><i className="fas fa-chevron-left"></i></button>
						<button key={uuidv4()} aria-label='right arrow' className='right-arrow slide-button rounded-circle shadow-none mx-2' type='button'><i className="fas fa-chevron-right"></i></button>
					</div>

				</Row>
			</Container>
		</section>
	)
}

export default Testimonial;
