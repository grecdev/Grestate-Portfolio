import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import { GlobalContext } from '../../../context/GlobalContext';

const PropertyBox = () => {

	const {

		db,
		filtered_db,
		getImage
		
	} = useContext(GlobalContext);

	const [defaultProperties, setDefaultProperties] = useState([]);

	useEffect(() => {

		const defaultProperties = db.filter((item, index) => item.propertyStatus === 'buy' && index <= 2);

		setDefaultProperties(defaultProperties);

		console.log(filtered_db);
		
	}, [db]);

	if(filtered_db.length ===0) {

		return defaultProperties.map((item, index) => (
	
			<div key={uuidv4()} className="property-box">
				Default properties
			</div>
	
		));

	} else {

		return filtered_db.map((item, index) => (

			<div key={uuidv4()} className="property-box">
				Filtered Properties
			</div>

		));
	}
}

// PropertyBox.propTypes = {
	
// }

export default PropertyBox;
