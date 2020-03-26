import React, { PureComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { GlobalContext } from '../../../context/GlobalContext';

import { Marker } from 'react-map-gl';

export class Markers extends PureComponent {

	static contextType = GlobalContext;
	
	render() {

		const { data } = this.props;
		const { getImage } = this.context;

		return data.map(item => (
			<Marker key={uuidv4()} longitude={item.coordinates.longitude} latitude={item.coordinates.latitude} ><img src={getImage("pin.svg")} />
				
				<div className="marker-info p-2 rounded">
					<p className='m-0'>{item.country}</p>
					<p className='m-0'>{item.city}</p>
				</div>
			</Marker>
		))
	}
}

export default Markers;
