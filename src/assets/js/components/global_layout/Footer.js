import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { GlobalContext } from '../../context/GlobalContext';

const Footer = () => {

	const { getImage } = useContext(GlobalContext);

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

								<a href='https://github.com/grecdev' rel='noreferrer noopener' target='_blank' className='mx-3'><img src={getImage('github-icon.svg')} alt='github icon' /></a>

								<a href='https://twitter.com/grecdev' rel='noreferrer noopener' target='_blank' className='mx-3'><img src={getImage('twitter-icon.svg')} alt='github icon' /></a>

								<a href='https://www.instagram.com/grecdev1/' rel='noreferrer noopener' target='_blank' className='mx-3'><img src={getImage('instagram-icon.svg')} alt='github icon' /></a>

								<a href='https://www.linkedin.com/in/grecdev/' rel='noreferrer noopener' target='_blank' className='mx-3'><img src={getImage('linkedin-icon.svg')} alt='github icon' /></a>

							</div>

						</div>
					</Col>

					<Col>
						<div className="footer-image mx-auto"><img src={getImage('houses-footer.svg')} alt='neighbourhood' /></div>
					</Col>

				</Row>
			</Container>
		</footer>
	)
}

export default Footer;
