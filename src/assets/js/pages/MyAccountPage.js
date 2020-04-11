import React, { useContext, useEffect } from 'react';

import { AuthenticationContext } from '@context/AuthenticationContext';
import { GlobalContext } from '@context/GlobalContext';

import Container from 'react-bootstrap/Container';

const MyAccountPage = () => {

	const {

		user_data,
		user

	} = useContext(AuthenticationContext);

	const {

		changePage

	} = useContext(GlobalContext);

	useEffect(() => {

		if(!user || !user_data) changePage('/');

	}, [user, user_data]);

	return user ? (
		<main id='my-account'>
			<Container>
				<ul>
					<li>Name: {user.displayName}</li>
					<li>Email: {user.email}</li>
					<li>Age: {user_data.age}</li>
					<li>Gender: {user_data.gender}</li>
				</ul>
			</Container>
		</main>

	) : null
}

export default MyAccountPage
