import React, { 

	useEffect,
	memo,
	useContext

} from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '@context/GlobalContext';

import Image from '@components/global_layout/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ImageSliderSmall = (props) => {

	const {

		images,
		shownImage,
		setShownImage,
		transitionTime,
		toggleSliderModal,
		modal_visible

	} = props;

	const { isMobile } = useContext(GlobalContext);

	let direction = '';
	const mobile = window.matchMedia('(min-width: 768px) and (max-height: 1024px) and (orientation: portrait)').matches || window.matchMedia('(min-width: 320px) and (max-width: 480px)').matches;

	// For some mobile devices images should be aligned on x axis
	mobile ? direction = 'translateX' : direction = 'translateY';

	const displayImages = () => {

		document.querySelectorAll('.review-image').forEach((image, index) => {

			image.style.transition = 'none';
			
			setTimeout(() => image.style.transition = '', 100);

			let image_pos;

			let image_width = Math.ceil(image.getBoundingClientRect().width);
			
			// We need some spacing for review images on mobile devices
			mobile && (image_width = image_width + parseFloat(window.getComputedStyle(image).getPropertyValue('margin-left')) * 2);
			
			// I use this because we have more than 3 images, but the slider displays only 3
			if(shownImage >= document.querySelectorAll('.review-image').length - 1) image_pos = image_width * (index - 2);
			else image_pos = image_width * (index - shownImage);

			image.style.transform = `${direction}(${image_pos}px)`;
			const current_pos = parseFloat(image.style.transform.match(/[\d\-]/g).join(''));
			
			if(current_pos < 0) image.style.transform = `${direction}(${-image_width}px)`;
			if(current_pos >= image_width) image.style.transform = `${direction}(${image_width}px)`;
		});
	}

	useEffect(() => {

		displayImages();

	}, [modal_visible]);

	const changeImage = e => {

		const {

			classList,
			dataset,

		} = e.currentTarget;

		const current_image = parseFloat(dataset.imageIndex);
		const toggle_event = dataset.toggleEvent === 'true';
		
		if(classList.contains('image-small') && toggle_event) {

			setShownImage(current_image);
			document.querySelector('.image-showcase > p span').textContent = current_image + 1;

			document.querySelectorAll('.image-small').forEach(image => {
				
				// So we have only one image selected
				image.classList.remove('selected');

				// Throttle workaround
				image.setAttribute('data-toggle-event', 'false');

				setTimeout(() => image.setAttribute('data-toggle-event', 'true'), transitionTime);
			});

			classList.add('selected');

			document.querySelectorAll('.review-image').forEach((image, index) => {

				let image_width = Math.ceil(image.getBoundingClientRect().width);

				// We need some spacing for review images on mobile devices
				mobile && (image_width = image_width + parseFloat(window.getComputedStyle(image).getPropertyValue('margin-left')) * 2);

				const current_pos = parseFloat(image.style.transform.match(/[\d\-]/g).join(''));

				// Moving upwards
				if(index < current_image) {

					image.style.transform = `${direction}(${-image_width}px)`;

					// So we don't see any image that overlap the current shown ones
					if(current_pos > 0) {

						image.style.transition = 'none';

						setTimeout(() => image.style.transition = '', transitionTime);
					}
				}

				// The image that we click comes to center
				if(index === current_image) image.style.transform = `${direction}(${0}px)`;

				// Moving downwards
				if(index > current_image) {

					image.style.transform = `${direction}(${image_width}px)`;

					// So we don't see any image that overlap the current shown ones
					if(current_pos < 0) {

						image.style.transition = 'none';

						setTimeout(() => image.style.transition = '', transitionTime);
					}
				}
			});
		}

		e.stopPropagation();
	}

	const toggleSlider = e => {

		if(e.currentTarget.tagName === 'DIV') toggleSliderModal(true);

		e.stopPropagation();
	}

	return (
		<section id='images-slider-small'>
			<Row className='m-0'>
				<Col className='d-flex flex-column justify-content-between align-items-start p-0 col-12 col-lg-3 col-md-12 mr-3'>
					{
						// Here the images will always render when we click on them so, i can't use throttle helper
						// But i use a 'throttle workaround'
						images.map((image, index) => {

							let className = 'rounded image-small mb-3';
							// Hightlight the clicked image
							index === shownImage && (className += ' selected');

							// Display only 3 images on the smaller slider
							if(index < 3) {

								return (

									<div
										className={className}
										key={image}
										onClick={changeImage}
										data-image-index={index}
										data-toggle-event='true'
									>
										<Image src={image} />
									</div>
									
								)
							}
						})
					}
				</Col>

				<Col className='p-0 col-lg-8 col-12 col-md-12'>
					<div className="image-showcase position-relative overflow-hidden">

						{images.map((image, index) => {

							if(index < 3) return (

								<div
									key={image}
									data-image-index={index}
									className='review-image rounded position-absolute'
								>
									<Image src={image} />
								</div>
								
							)}

						)}

				    <p className="position-absolute px-3 py-1 rounded"><span>{shownImage + 1}</span> / {images.length}</p>

						<div className="rounded position-absolute d-flex flex-column justify-content-center align-items-center" onClick={toggleSlider}>
							{!isMobile && <p>See more images <i className="ml-2 fas fa-images"></i></p>}
						</div>
						
					</div>
				</Col>
			</Row>
		</section>
	)
}

ImageSliderSmall.propTypes = {
	images: PropTypes.array.isRequired,
	shownImage: PropTypes.number.isRequired,
	transitionTime: PropTypes.number.isRequired,
	setShownImage: PropTypes.func.isRequired,
	toggleSliderModal: PropTypes.func.isRequired,
	modal_visible: PropTypes.bool.isRequired
}

export default memo(ImageSliderSmall);
