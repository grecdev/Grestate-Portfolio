import React, { PureComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { GlobalContext } from '../../../../context/GlobalContext';

import { Marker } from 'react-map-gl';

export class Markers extends PureComponent {

	static contextType = GlobalContext;

	togglePopup = e => {

		const { getImage } = this.context;

		const { togglePopup, getPropertyInfo } = this.props;

		togglePopup(true);

		getPropertyInfo(e.target.dataset.propertyIndex);

		e.stopPropagation();
	}

	hightlightProperty = e => {

		const { getImage } = this.context;

		const propertyIndex = e.currentTarget.dataset.propertyIndex;

		const propertyBox = document.querySelectorAll('.property-box')[propertyIndex];

		if(document.querySelectorAll('.property-box').length > 0) {

			e.type === 'mouseenter' && propertyBox.classList.add('highlight-property');
			e.type === 'mouseleave' && propertyBox.classList.remove('highlight-property');
		}

		e.type === 'mouseenter' && e.currentTarget.setAttribute('src', getImage('hightlight-pin.svg'));
		e.type === 'mouseleave' && e.currentTarget.setAttribute('src', getImage('pin.svg'));

		e.stopPropagation();
	}
	
	render() {

		const { data, showPopup } = this.props;
		const { getImage } = this.context;

		return data.map((item, index) => (
			<Marker
				key={uuidv4()}
				longitude={item.coordinates.longitude}
				latitude={item.coordinates.latitude}
			>
				<img
					src={getImage("pin.svg")}
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
	getPropertyInfo: PropTypes.func.isRequired,
	showPopup: PropTypes.bool.isRequired
}

export default Markers;
