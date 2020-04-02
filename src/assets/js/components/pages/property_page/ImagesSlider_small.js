import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '@context/GlobalContext';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ImagesSlider_small = ({ images }) => {

	const { getImage } = useContext(GlobalContext);

	const defaultState = {
		// So when we click on the smaller image, display it on the big one
		image_shown: 0
	}
	
	return (
		<section id='images-slider-small'>
			<Row className='m-0'>
				<Col className='d-flex flex-column justify-content-between align-items-start p-0 col-lg-3 mr-3'>
					{
						images.reviewImages.map((image, index) => {

							if(index < 3) {

								if(index === defaultState.image_shown) {

									return (

										<div className="image-small rounded selected mb-3" key={image}>
											<img className='rounded' src={getImage(image)} alt='image' />
										</div>
										
									)
								}

								return (

									<div className="image-small mb-3" key={image}>
										<img className='rounded' src={getImage(image)} alt='image' />
									</div>
									
								)
							}
						})
					}
				</Col>

				<Col className='p-0 col-lg-8'>
					<div className="image-big position-relative">
						<img className='rounded' src={getImage(images.showcaseImage)} alt={images.showcaseImage} />

				    <p className="position-absolute px-3 py-1 rounded">{defaultState.image_shown + 1} / {images.reviewImages.length}</p>
					</div>
				</Col>
			</Row>
		</section>
	)
}

ImagesSlider_small.propTypes = {
	images: PropTypes.object.isRequired
}

export default ImagesSlider_small;
