import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '@context/GlobalContext';

const ImageSliderBig = (props) => {

	const {

		getImage

	} = useContext(GlobalContext);

	const {

		shownImage,
		images,
		toggleSliderModal,
		transitionTime,
		setShownImage

	} = props;

	const displayImages = () => {

		document.querySelectorAll('#images-slider-big .image-gallery img').forEach((image, index) => {

			image.style.transition = 'none';
			setTimeout(() => image.style.transition = '', transitionTime);

			const image_margin = parseFloat(window.getComputedStyle(image).getPropertyValue('margin-left'));
			const image_width = Math.ceil(image.getBoundingClientRect().width + image_margin);
			const image_pos = image_width * (index - shownImage);

			image.style.transform = `translateX(${image_pos}px)`;

			const current_pos = parseFloat(image.style.transform.match(/[\d\-]/g).join(''));
			
			if(current_pos < 0) image.style.transform = `translateX(${-image_width}px)`;
			if(current_pos > 0) image.style.transform = `translateX(${image_width}px)`;
		});

		if(document.body.contains(document.querySelector('.selected'))) document.querySelector('.selected').classList.remove('selected');
	}

	useEffect(() => {

		displayImages();

		console.log('dd');

	}, []);

	let count = shownImage;
	
	const changeImage = e => {
		
		const target = e.currentTarget;
		const toggle = target.dataset.eventToggle === 'true';
		
		if(target.tagName === 'DIV' && toggle) {

			if(target.id.includes('left')) {

				if(count === 3) count = 0;
				else count++;
			}

			if(target.id.includes('right')) {

				if(count === 0) count = document.querySelectorAll('#images-slider-big .image-gallery img').length - 1;
				else count--;
			}

			document.querySelectorAll('#images-slider-big .image-gallery img').forEach((image, index) => {
	
				const image_margin = parseFloat(window.getComputedStyle(image).getPropertyValue('margin-left'));
				const image_width = Math.ceil(image.getBoundingClientRect().width + image_margin);				
				const current_pos = parseFloat(image.style.transform.match(/[\d\-]/g).join(''));

				if(target.id.includes('left')) {

					if(index === count) {
						
						if(current_pos < 0) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${image_width}px)`;

							setTimeout(() => {

								image.style.transition = '';
								image.style.transform = `translateX(${0}px)`;

							}, 0);
						}

						if(current_pos > 0) image.style.transform = `translateX(${0}px)`;
					}

					if(current_pos === 0) image.style.transform = `translateX(${-image_width}px)`;
				}

				if(target.id.includes('right')) {

					if(index === count) {

						if(current_pos > 0) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${-image_width}px)`;

							setTimeout(() => {

								image.style.transition = '';
								image.style.transform = `translateX(${0}px)`;

							}, 0);
						}

						if(current_pos < 0) image.style.transform = `translateX(${0}px)`;
					}

					if(current_pos === 0) image.style.transform = `translateX(${image_width}px)`;
				}
			});

			target.setAttribute('data-event-toggle', 'false');

			setTimeout(() => target.setAttribute('data-event-toggle', 'true'), transitionTime + 200);
		}

		document.querySelector('.image-gallery > p span').textContent = count + 1;

		e.stopPropagation();
	}

	const toggleSlider = e => {

		if(e.target.id === 'images-slider-big' || e.currentTarget.id === 'close-slider') {

			toggleSliderModal(false);

			document.querySelectorAll('#images-slider-big .image-gallery img').forEach((image, index) => {

				const current_pos = parseFloat(image.style.transform.match(/[\d\-]/g).join(''));
	
				if(current_pos === 0) setShownImage(index);
			});
		}

		e.stopPropagation();
	}

	return (
		<section id='images-slider-big' className='px-5 position-fixed d-flex flex-row justify-content-between align-items-center' onClick={toggleSlider}>

			<div id="close-slider" role='button' className='position-absolute' onClick={toggleSlider}><i className="fas fa-times"></i></div>

			<div 
				id="left-arrow"
				role='button'
				className='text-center'
				data-event-toggle='true'
				onClick={changeImage}
			>
				<i className="fas fa-chevron-left"></i>
			</div>

			<div className="image-gallery position-relative overflow-hidden">

				{ images.map(image => (

					<img
						key={image}
						src={getImage(image)}
						alt={image}
						className='position-absolute mx-5'
					/>

				))}

				<p className="position-absolute px-3 py-1 rounded"><span>{shownImage + 1}</span> / {images.length}</p>
			</div>

			<div 
				id="right-arrow"
				role='button'
				className='text-center'
				onClick={changeImage}
				data-event-toggle='true'
			>
				<i className="fas fa-chevron-right"></i>
			</div>
		</section>
	)
}

export default ImageSliderBig;
