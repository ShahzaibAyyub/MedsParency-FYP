import React from 'react';

import { ReviewProductContainer } from './containers/reviewProductContainer/reviewProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const ReviewProduct = () => {
  return (
    <div>
      <NavLink to="/products" activeClassName="active">
        <FontAwesomeIcon icon={Icons.faTachometerAlt} style={{ width: '18px', marginRight: '7px' }} />
        <span>Products</span>
      </NavLink>
      <section id="team" className="pb-5">
        <div className="container">
          <h5 className="section-title h1">Review Product</h5>
          <ReviewProductContainer />
        </div>
      </section>
    </div>
  );
};

export default ReviewProduct;
