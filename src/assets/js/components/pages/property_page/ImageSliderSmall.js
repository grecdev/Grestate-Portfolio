import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '@context/GlobalContext';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ImageSliderSmall = (props) => {

	const {

		getImage,
		throttleEvent

	} = useContext(GlobalContext);

	const {

		images,
		shownImage,
		setShownImage,
		transitionTime,
		toggleSliderModal,
		sliderModalVisible

	} = props;

	const displayImages = () => {

		document.querySelectorAll('.review-image').forEach((image, index) => {

			image.style.transition = 'none';
			
			setTimeout(() => image.style.transition = '', transitionTime);

			let image_pos;
		
			const image_width = Math.ceil(image.getBoundingClientRect().width);
			
			if(shownImage >= document.querySelectorAll('.review-image').length - 1) image_pos = image_width * (index - 2);
			else image_pos = image_width * (index - shownImage);

			image.style.transform = `translateY(${image_pos}px)`;
			const current_pos = parseFloat(image.style.transform.match(/[\d\-]/g).join(''));
			
			if(current_pos < 0) image.style.transform = `translateY(${-image_width}px)`;
			if(current_pos >= image_width) image.style.transform = `translateY(${image_width}px)`;
		});

		console.log(shownImage);
	}

	useEffect(() => {

		displayImages();

	}, [shownImage]);

	const changeImage = e => {

		const target = e.currentTarget;
		const current_image = parseFloat(target.dataset.imageIndex);

		setShownImage(current_image);

		if(target.classList.contains('image-small')) {

			document.querySelectorAll('.image-small').forEach(image => image.classList.remove('rounded', 'selected'));

			target.classList.add('rounded', 'selected');

			document.querySelectorAll('.review-image').forEach((image, index) => {

				const image_width = Math.ceil(image.getBoundingClientRect().width);
				const current_pos = parseFloat(image.style.transform.match(/[\d\-]/g).join(''));

				// Moving upwards
				if(index < current_image) {

					image.style.transform = `translateY(${-image_width}px)`;
					
					// So we don't see any image that overlap the current shown ones
					if(current_pos > 0) {

						image.style.transition = 'none';

						setTimeout(() => image.style.transition = '', transitionTime);
					}
				}

				// The image that we click comes to center
				if(index === current_image) image.style.transform = `translateY(${0}px)`;

				// Moving downwards
				if(index > current_image) {

					image.style.transform = `translateY(${image_width}px)`;

					// So we don't see any image that overlap the current shown ones
					if(current_pos > 0) {

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
				<Col className='d-flex flex-column justify-content-between align-items-start p-0 col-lg-3 mr-3'>
					{
						images.reviewImages.map((image, index) => {

							if((shownImage >= 3 && index === 2) || (index === shownImage && index < 3)) return (

								<div
									className="image-small rounded selected mb-3"
									key={image}
									onClick={throttleEvent(changeImage, transitionTime + 200)}
									data-image-index={index}
								>
								<img className='rounded' src={getImage(image)} alt='image' />
							</div>

							)

							if(index < 3) return (

								<div
									className="image-small mb-3"
									key={image}
									onClick={throttleEvent(changeImage, transitionTime + 200)}
									data-image-index={index}
								>
									<img className='rounded' src={getImage(image)} alt='image' />
								</div>
								
							)
							
						})
					}
				</Col>

				<Col className='p-0 col-lg-8'>
					<div className="image-showcase position-relative overflow-hidden">

						{images.reviewImages.map(image => <img key={image} className='review-image rounded position-absolute' src={getImage(image)} alt={image} /> )}

				    <p className="position-absolute px-3 py-1 rounded">{shownImage >= 3 ? shownImage : shownImage + 1} / {images.reviewImages.length}</p>

						<div className="rounded position-absolute d-flex flex-column justify-content-center align-items-center" onClick={toggleSlider}>
							<p>See more images <i className="ml-2 fas fa-images"></i></p>
						</div>
					</div>
				</Col>
			</Row>
		</section>
	)
}

ImageSliderSmall.propTypes = {
	images: PropTypes.object.isRequired,
	setShownImage: PropTypes.func.isRequired,
	shownImage: PropTypes.number.isRequired,
	transitionTime: PropTypes.number.isRequired,
	toggleSliderModal: PropTypes.func.isRequired
}

export default ImageSliderSmall;
