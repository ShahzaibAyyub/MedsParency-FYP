import React from 'react';

import { AddProductContainer } from './containers/addProductContainer/addProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const AddProduct = () => {
  return (
    <div>
      <NavLink to="/products" activeClassName="active">
        <FontAwesomeIcon icon={Icons.faTachometerAlt} style={{ width: '18px', marginRight: '7px' }} />
        <span>Products</span>
      </NavLink>
      <section id="team" className="pb-5">
        <div className="container">
          <h5 className="section-title h1">Add New Product</h5>
          <AddProductContainer />
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
