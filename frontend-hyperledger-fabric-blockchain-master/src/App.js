import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Container, Row, Col } from 'react-bootstrap';
import './assets/sass/style.scss';
import './assets/css/custom.css';
import Products from './pages/product';
import AddProduct from './pages/addProduct';
import UpdateProduct from './pages/updateProduct';
import Header from './components/header/index';
import Footer from './components/footer/index';
import { history } from './helpers';
import { productActions } from './pages/product/containers/productListingContainer/actions';
import ReviewProduct from './pages/reviewProduct';
import { DetailProduct } from './pages/detailProduct';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(productActions.fetchUser());
    this.props.dispatch(productActions.fetchProducts());
  }

  render() {
    return (
      <Router history={history}>
        <Header />
        <main>
          <ReactNotification />
          <Container fluid>
            <Row>
              <Col md={12}>
                <main className="main-content p-3">
                  <Route exact path="/" component={withRouter(Products)} />
                  <Route path="/products" component={withRouter(Products)} />
                  <Route path="/add_product" component={withRouter(AddProduct)} />
                  <Route path="/update_product" component={withRouter(UpdateProduct)} />
                  <Route path="/review_product" component={withRouter(ReviewProduct)} />
                  <Route path="/detail_product" component={withRouter(DetailProduct)} />
                </main>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ productActions }, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);
