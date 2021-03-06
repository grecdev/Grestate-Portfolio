import React from 'react';
import { Link } from 'react-router-dom';

import Image from './Image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';	

const Footer = () => {

	return (
		<footer>
			<Container className='pt-5 px-3 pb-0'>
				<Row className='flex-column align-items-center'>

					<Col>
						<div className="footer-info text-center">

							<div className="footer-sitemap text-center font-weight-bold">
								<Link className='mx-3' to='/about'>About</Link>
								<Link className='mx-3' to='/contact'>Contact</Link>
								<a className='mx-3'>Help</a>
								<a className='mx-3'>Terms of use</a>
								<a className='mx-3'>Mobile apps</a>
							</div>

							<p className='my-4'>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat omnis molestiae in expedita magni animi accusantium nulla pariatur vel eos repellendus quaerat dignissimos, sapiente nemo! Ratione aut voluptas eius itaque a. Odio accusamus illum non repellat veritatis esse qui assumenda mollitia, aspernatur a nostrum reiciendis, harum, illo accusantium sequi cum?
							</p>

							<div className="d-flex flex-row justify-content-center footer-social">

								<a href='https://github.com/grecdev' aria-label='github profile' rel='noreferrer noopener' target='_blank' className='mx-3'><i className="fab fa-github-square"></i></a>

								<a href='https://twitter.com/grecdev' aria-label='twitter profile' rel='noreferrer noopener' target='_blank' className='mx-3'><i className="fab fa-twitter-square"></i></a>

								<a href='https://www.instagram.com/grecdev1/' aria-label='instagram profile' rel='noreferrer noopener' target='_blank' className='mx-3'><i className="fab fa-instagram"></i></a>

								<a href='https://www.linkedin.com/in/grecdev/' aria-label='linkedin profile' rel='noreferrer noopener' target='_blank' className='mx-3'><i className="fab fa-linkedin"></i></a>

							</div>

						</div>
					</Col>

					<Col>
						<div className="footer-image mx-auto"><Image src='houses-footer.svg' /></div>
					</Col>

				</Row>
			</Container>
		</footer>
	)
}

export default Footer;
