import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';

import '../../index.scss';
import { updateProductActions } from './actions';

class UpdateProductContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      name: props.name,
      description: props.description,
      image: props.image,
      color: props.color,
      docType: props.docType,
      quantity: props.quantity,
      make: props.make,
      owner: props.owner,
      price: props.price
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateProduct = (e) => {
    e.preventDefault();
    if (this.state) {
      this.props.dispatch(updateProductActions.updateProduct(this.state));
    }
  };

  getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      // eslint-disable-next-line no-console
      console.log('Error: ', error);
    };
  };

  imageChange = (e) => {
    let self = this;
    let image = e.target.files[0];
    this.getBase64(image, (result) => {
      self.setState({ image: result });
    });
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
            <form name="accounts_settings" onSubmit={this.updateProduct} className="profile-form">
              <Form.Group controlId="name">
                <label>Name</label>
                <Col sm="9">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group controlId="docType">
                <label>Product Type</label>
                <Col sm="9">
                  <input
                    type="text"
                    id="docType"
                    name="docType"
                    className="form-control"
                    value={this.state.docType}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group controlId="price">
                <label>Price</label>
                <Col sm="9">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    value={this.state.price}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group controlId="quantity">
                <label>Quantity</label>
                <Col sm="9">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-control"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group controlId="description">
                <label>Description</label>
                <Col sm="9">
                  <textarea
                    rows="4"
                    cols="50"
                    name="description"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.handleChange}
                  >
                    {this.state.description}
                  </textarea>
                </Col>
              </Form.Group>

              <Form.Group controlId="image">
                <label>Featured Image</label>
                <Col sm="10" className="profile-image-holder">
                  <img
                    src={this.state.image}
                    alt="Profile"
                    className="profile-image"
                    style={{ display: this.state.image ? 'block' : 'none' }}
                  />
                  <div className="custom-file dragable">
                    <input type="file" id="image" name="image" onChange={this.imageChange} className="form-control" />
                    <label htmlFor="image" className="custom-file-label">
                      Drop file here or click to uplaod
                    </label>
                  </div>
                  <span className="input-info">You can attach gif, jpg, png, with a maximum size of 1MB</span>
                </Col>
              </Form.Group>

              <Form.Group controlId="submit" sm="md-auto">
                <label>&nbsp;</label>
                <Col sm="9">
                  <input type="submit" value="Update" className="btn btn-primary btn-lg" />
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
  const { id, name, description, image, color, docType, make, owner, price, quantity } = state.UPDATE_PRODUCT;

  return {
    id,
    name,
    description,
    image,
    color,
    docType,
    make,
    owner,
    price,
    quantity
  };
}

const updateProduct = connect(mapStateToProps)(UpdateProductContainer);
export { updateProduct as UpdateProductContainer };
