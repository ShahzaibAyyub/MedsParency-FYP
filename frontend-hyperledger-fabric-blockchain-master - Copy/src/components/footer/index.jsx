import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.scss';

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <Container fluid>
        <Row>
          <Col className="text-center">
            <span>Powered by ITU Lahore</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
