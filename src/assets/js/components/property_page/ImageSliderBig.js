import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { throttleEvent } from '@helpers';

import Image from '@components/global_layout/Image';

const ImageSliderBig = (props) => {

	const {

		shownImage,
		images,
		toggleSliderModal,
		transitionTime,
		setShownImage

	} = props;

	const displayImages = () => {

		document.querySelectorAll('#images-slider-big .image-gallery > div').forEach((image, index) => {

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
	}

	useEffect(() => {

		displayImages();

	}, []);

	let count = shownImage;
	
	const changeImage = e => {
		
		const target = e.currentTarget;
		
		if(target.tagName === 'DIV') {

			if(target.id.includes('left')) {

				if(count === 3) count = 0;
				else count++;
			}

			if(target.id.includes('right')) {

				if(count === 0) count = document.querySelectorAll('#images-slider-big .image-gallery > div').length - 1;
				else count--;
			}

			document.querySelectorAll('#images-slider-big .image-gallery > div').forEach((image, index) => {
	
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

			document.querySelector('.image-gallery > p span').textContent = count + 1;
		}

		e.stopPropagation();
	}

	const toggleSlider = e => {

		if(e.target.id === 'images-slider-big' || e.currentTarget.id === 'close-slider') {

			toggleSliderModal(false);

			let image = parseFloat(document.querySelector('.image-gallery > p span').textContent) - 1;

			// Because on the smaller slider we display only 3 images
			image > 2 ? image = 2 : image;

			setShownImage(image);
		}

		e.stopPropagation();
	}

	return (
		<section 
			id='images-slider-big' 
			className='p-5 position-fixed overflow-auto d-flex flex-row justify-content-between align-items-stretch' 
			onClick={toggleSlider}
		>
			<div id="close-slider" role='button' className='position-absolute' onClick={toggleSlider}><i className="fas fa-times"></i></div>

			<div 
				id="left-arrow"
				role='button'
				className='text-center my-auto'
				onClick={throttleEvent(changeImage, transitionTime)}
			>
				<i className="fas fa-chevron-left"></i>
			</div>

			<div className="image-gallery mx-5 position-relative overflow-hidden">

				{ images.map(image => (

					<div
						key={image}
						className='position-absolute mx-5'
					>
						<Image src={image} />
					</div>

				))}

				<p className="position-absolute px-3 py-1 rounded"><span>{shownImage + 1}</span> / {images.length}</p>
			</div>

			<div 
				id="right-arrow"
				role='button'
				className='text-center my-auto'
				onClick={throttleEvent(changeImage, transitionTime)}
			>
				<i className="fas fa-chevron-right"></i>
			</div>
		</section>
	)
}

ImageSliderBig.propTypes = {
	images: PropTypes.array.isRequired,
	shownImage: PropTypes.number.isRequired,
	transitionTime: PropTypes.number.isRequired,
	setShownImage: PropTypes.func.isRequired,
	toggleSliderModal: PropTypes.func.isRequired
}

export default ImageSliderBig;
