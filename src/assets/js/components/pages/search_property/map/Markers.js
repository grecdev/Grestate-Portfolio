import React, { PureComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { GlobalContext } from '../../../../context/GlobalContext';

import { Marker } from 'react-map-gl';

export class Markers extends PureComponent {

	static contextType = GlobalContext;

	togglePopup = e => {

		const { togglePopup, getPropertyInfo } = this.props;

		togglePopup(true);

		getPropertyInfo(e.target.dataset.propertyIndex);

		e.stopPropagation();
	}

	hightlightProperty = e => {

		const { getImage, location } = this.context;

		const propertyIndex = e.currentTarget.dataset.propertyIndex;

		const propertyBox = document.querySelectorAll('.property-box')[propertyIndex];

		if(document.querySelectorAll('.property-box').length > 0) {

			e.type === 'mouseenter' && propertyBox.classList.add('highlight-property');
			e.type === 'mouseleave' && propertyBox.classList.remove('highlight-property');
		}

		if(location.includes('buy')) {

			e.type === 'mouseenter' && e.currentTarget.setAttribute('src', getImage('hightlight-pin-1.svg'));
			e.type === 'mouseleave' && e.currentTarget.setAttribute('src', getImage('pin-1.svg'));
		}

		if(location.includes('rent')) {

			e.type === 'mouseenter' && e.currentTarget.setAttribute('src', getImage('hightlight-pin-2.svg'));
			e.type === 'mouseleave' && e.currentTarget.setAttribute('src', getImage('pin-2.svg'));
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
					src={location.includes('buy') ? getImage("pin-1.svg") : getImage("pin-2.svg")}
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
