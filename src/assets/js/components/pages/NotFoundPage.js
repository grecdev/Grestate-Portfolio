import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalContext';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NotFoundPage = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<>
			<section id="not-found">
				<Row className='m-0'>
					<Col className='py-5 d-flex flex-column justify-content-center align-items-center'>
						<img src={getImage('lost.svg')} alt='not found' />
					</Col>

					<Col className='p-0 d-flex flex-column justify-content-center align-items-center'>
						<div>
							<h1 className='text-center font-weight-bold mb-3'>404</h1>
							<p>You sould stay on your path</p>
							<Link to='/' className='d-block text-center'>Go back from where you started <i className="ml-2 fas fa-hiking"></i></Link>
						</div>
					</Col>
				</Row>
			</section>
		</>
	)
}

export default NotFoundPage
