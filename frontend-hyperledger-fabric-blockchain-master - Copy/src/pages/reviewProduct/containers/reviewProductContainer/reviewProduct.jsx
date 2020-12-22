import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import '../../index.scss';

import { reviewProductActions } from './actions';

class ReviewProductContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_id: props.id,
      product_name: props.name,
      user_id: props.user_id,
      description: props.description,
      token: props.token
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  reviewProduct = (e) => {
    e.preventDefault();
    if (this.state) {
      this.props.dispatch(reviewProductActions.reviewProduct(this.state));
    }
  };

  render() {
    const { match, id } = this.props;
    if (!id) {
      return <Redirect to="/" />;
    }

    return (
      <Col md={12}>
        <h1>{match}</h1>
        <div className="tabs" id="accountSettings">
          <div className="tab-content">
            <form name="accounts_settings" onSubmit={this.reviewProduct} className="profile-form">
              <Form.Group controlId="id">
                <label>Product</label>
                <Col sm="9">
                  <input
                    type="text"
                    id="id"
                    name="id"
                    className="form-control"
                    value={this.state.product_name}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group controlId="description">
                <label>Review</label>
                <Col sm="9">
                  <textarea
                    rows="5"
                    cols="50"
                    name="description"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                  >
                    {this.state.description}
                  </textarea>
                </Col>
              </Form.Group>

              <Form.Group controlId="submit" sm="md-auto">
                <label>&nbsp;</label>
                <Col sm="9">
                  <input type="submit" value="Save" className="btn btn-primary btn-lg" />
                  &nbsp;&nbsp;
                  <Link className="btn btn-primary btn-lg" to="/">
                    Cancel
                  </Link>
                </Col>
              </Form.Group>
            </form>

            <br />
            <hr />
            <br />
          </div>
        </div>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  const { id, name } = state.UPDATE_PRODUCT;
  const { description } = state.REVIEW_PRODUCT;
  const { user_id, puchasedProducts } = state.USER;

  let token;

  puchasedProducts.forEach((puchased_product) => {
    if (id === puchased_product.productId) {
      token = puchased_product.reviewToken;
    }
  });

  return {
    id,
    name,
    user_id,
    description,
    token
  };
}

const reviewProduct = connect(mapStateToProps)(ReviewProductContainer);
export { reviewProduct as ReviewProductContainer };
