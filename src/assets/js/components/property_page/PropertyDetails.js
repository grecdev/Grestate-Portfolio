import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

const PropertyDetails = (props) => {
  const {
    propertyPrice,
    propertyRent,
    addressLocation,
    addressCity,
    bedrooms,
    bathrooms,
    yearBuilt,
    propertySize,
    propertyDescription,
    features,
    listingAgent,
  } = props.info;

  const like = (e) => {
    const target = e.currentTarget;

    if (target.tagName === 'DIV') {
      if (target.dataset.likeToggle === 'true') {
        target.children[0].setAttribute('class', 'fas fa-heart');

        setTimeout(() => target.setAttribute('data-like-toggle', 'false'), 100);
      }

      if (target.dataset.likeToggle === 'false') {
        target.children[0].setAttribute('class', 'far fa-heart');

        setTimeout(() => target.setAttribute('data-like-toggle', 'true'), 100);
      }

      target.classList.add('hightlight');

      setTimeout(() => target.classList.remove('hightlight'), 100);
    }

    e.stopPropagation();
  };

  return (
    <section id='property-details'>
      <div className='property-details-header d-flex flex-wrap flex-row justify-content-start align-items-start py-3'>
        {propertyPrice && (
          <p className='price font-weight-bold'>
            $ {parseFloat(propertyPrice).toLocaleString()}
          </p>
        )}

        {propertyRent && (
          <p className='price d-flex flex-row justify-content-start align-items-center font-weight-bold'>
            $ {parseFloat(propertyRent).toLocaleString()}{' '}
            <span className='ml-2'>/ month</span>
          </p>
        )}

        <div className='address'>
          <p className='m-0'>{addressLocation}</p>
          <p className='m-0 font-weight-bold'>{addressCity}</p>
        </div>

        <div className='like' data-like-toggle='true' onClick={like}>
          <i className='far fa-heart'></i>
        </div>
      </div>

      <div className='property-details-info py-3'>
        <div className='d-flex flex-wrap flex-row justify-content-between align-items-center'>
          <div className='info-box text-center'>
            <h3 className='text-secondary font-weight-light'>Bedrooms</h3>
            <p className='font-weight-bold'>
              {bedrooms} <i className='fas fa-bed ml-2'></i>
            </p>
          </div>

          <div className='info-box text-center'>
            <h3 className='text-secondary font-weight-light'>Bathrooms</h3>
            <p className='font-weight-bold'>
              {bathrooms} <i className='fas fa-bath ml-2'></i>
            </p>
          </div>

          <div className='info-box text-center'>
            <h3 className='text-secondary font-weight-light'>Property Size</h3>
            <p className='font-weight-bold'>
              {parseFloat(propertySize).toLocaleString()} ft<sup>2</sup>
            </p>
          </div>

          <div className='info-box text-center'>
            <h3 className='text-secondary font-weight-light'>Year Built</h3>
            <p className='font-weight-bold'>{yearBuilt}</p>
          </div>
        </div>

        <div className='property-details-description mb-4'>
          <h2 className='mb-3'>Description</h2>
          <p className='m-0'>{propertyDescription}</p>
        </div>

        <div className='property-details-amenities'>
          <h2 className='mb-4'>Property Amenities</h2>

          <div className='d-flex flex-row justify-content-start align-items-stretch mb-4'>
            <h4 className='font-weight-light text-secondary mr-4'>Interior</h4>

            <div className='d-flex flex-row flex-wrap justify-content-start align-items-start'>
              {features.interior.map((item) => {
                // Make every word have the first letter uppercase
                let formatted = item
                  .split(' ')
                  .map(
                    (item) =>
                      item.substring(0, 1).toUpperCase() + item.substring(1),
                  )
                  .join(' ');

                return (
                  <p className='feature-item p-2 mx-3 my-2' key={item}>
                    {formatted}
                  </p>
                );
              })}
            </div>
          </div>

          <div className='d-flex flex-row justify-content-start align-items-stretch'>
            <h4 className='font-weight-light text-secondary mr-4'>Exterior</h4>

            <div className='d-flex flex-row flex-wrap justify-content-start align-items-start'>
              {features.exterior.map((item) => {
                // Make every word have the first letter uppercase
                let formatted = item
                  .split(' ')
                  .map(
                    (item) =>
                      item.substring(0, 1).toUpperCase() + item.substring(1),
                  )
                  .join(' ');

                return (
                  <p className='feature-item p-2 mx-3 my-2' key={item}>
                    {formatted}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PropertyDetails.propTypes = {
  // info: PropTypes.object.isRequired
};

export default PropertyDetails;
