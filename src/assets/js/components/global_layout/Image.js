import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src }) => {

	const old_format = require(`../../../media/${src}`);

	if(src.includes('png') || src.includes('svg')) return <img src={old_format} alt={old_format} />
	else {

		// Change .jpg to .webp so we can use it in picture element
		const webp_format = require(`../../../media/${src.slice(0, src.lastIndexOf('.')) + '.webp'}`);

		return (

			<picture>
				<source srcSet={webp_format} type="image/webp"/>
				<source srcSet={old_format} type="image/jpg"/>
				
				<img src={webp_format} alt={webp_format} />
			</picture>
	
		)
	}
}

Image.propTypes = {
	src: PropTypes.string.isRequired
}

export default Image;
