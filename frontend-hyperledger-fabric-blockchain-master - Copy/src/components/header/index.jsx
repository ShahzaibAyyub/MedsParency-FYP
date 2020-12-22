import React from 'react';
import { Navbar } from 'react-bootstrap';
import SiteLogo from '../../assets/images/fabric-logo.png';
import './index.scss';

const Header = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/dashboard">
          <img src={SiteLogo} alt="site logoo" className="logo" height="160" width="450" />
        </Navbar.Brand>
        <h5 className="section-title h1">Hyperledger Fabric Blockchain</h5>
      </Navbar>
    </div>
  );
};

export default Header;
