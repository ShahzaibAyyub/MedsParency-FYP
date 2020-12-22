import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const SideBarNav = () => {
  return (
    <div>
      <Nav defaultActiveKey="/home" className="flex-column">
        <ul className="side-nav">
          <li>
            <NavLink to="/products" activeClassName="active">
              <FontAwesomeIcon
                icon={Icons.faTachometerAlt}
                style={{ width: '18px', marginRight: '7px' }}
              />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/add_product" activeClassName="active">
              <FontAwesomeIcon
                icon={Icons.faTools}
                style={{ width: '18px', marginRight: '7px' }}
              />
              <span>Add Product</span>
            </NavLink>
          </li>
        </ul>
      </Nav>
    </div>
  );
};

export default SideBarNav;
