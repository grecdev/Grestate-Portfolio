import React, { PureComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { GlobalContext } from '@context/GlobalContext';

import { Marker } from 'react-map-gl';

import pin1 from '../../../../media/pin-1.svg';
import hightlight_pin1 from '../../../../media/hightlight-pin-1.svg';

import pin2 from '../../../../media/pin-2.svg';
import hightlight_pin2 from '../../../../media/hightlight-pin-2.svg';

export class Markers extends PureComponent {

	static contextType = GlobalContext;

	togglePopup = e => {

		const { togglePopup, getPropertyInfo } = this.props;

		togglePopup(true);

		getPropertyInfo(e.target.dataset.propertyIndex);

		e.stopPropagation();
	}

	hightlightProperty = e => {

		const { location } = this.context;

		const propertyIndex = e.currentTarget.dataset.propertyIndex;

		const propertyBox = document.querySelectorAll('.property-box')[propertyIndex];

		if(document.querySelectorAll('.property-box').length > 0) {

			e.type === 'mouseenter' && propertyBox.classList.add('highlight-property');
			e.type === 'mouseleave' && propertyBox.classList.remove('highlight-property');
		}

		if(location.includes('buy')) {

			e.type === 'mouseenter' && e.currentTarget.setAttribute('src', hightlight_pin1);
			e.type === 'mouseleave' && e.currentTarget.setAttribute('src', pin1);
		}

		if(location.includes('rent')) {

			e.type === 'mouseenter' && e.currentTarget.setAttribute('src', hightlight_pin2);
			e.type === 'mouseleave' && e.currentTarget.setAttribute('src', pin2);
		}

		e.stopPropagation();
	}
	
	render() {

		const { data } = this.props;
		const { getImage, location } = this.context;

		return data.map((item, index) => (
			<Marker
				key={uuidv4()}
				longitude={item.coordinates.longitude}
				latitude={item.coordinates.latitude}
			>
				<img
					src={location.includes('buy') ? pin1 : pin2}
					className='marker-image'
					data-property-index={index}
					onClick={this.togglePopup}
					onMouseEnter={this.hightlightProperty}
					onMouseLeave={this.hightlightProperty}
				/>
			</Marker>
		))
	}
}

Markers.propTypes = {
	data: PropTypes.array.isRequired,
	togglePopup: PropTypes.func.isRequired,
	getPropertyInfo: PropTypes.func.isRequired
}

export default Markers;
