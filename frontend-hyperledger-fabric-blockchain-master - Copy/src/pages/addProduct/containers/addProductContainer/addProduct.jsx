import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Form } from 'react-bootstrap';
import '../../index.scss';

import { addProductActions } from './actions';
import { Link } from 'react-router-dom';

class AddProductContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.max_id,
      name: this.props.name,
      description: this.props.description,
      image: this.props.image,
      color: this.props.color,
      docType: this.props.docType,
      quantity: this.props.quantity,
      make: this.props.make,
      owner: this.props.owner,
      price: this.props.price
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addProduct = (e) => {
    e.preventDefault();
    if (this.state) {
      this.props.dispatch(addProductActions.addProduct(this.state));
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
    return (
      <Col md={12}>
        <div className="tabs" id="accountSettings">
          <div className="tab-content">
            <form name="accounts_settings" onSubmit={this.addProduct} className="profile-form">
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
  const { id, name, description, image, color, docType, make, owner, price, quantity } = state.ADD_PRODUCT;

  const { max_id } = state.PRODUCTS;

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
    max_id,
    quantity
  };
}

const addProduct = connect(mapStateToProps)(AddProductContainer);
export { addProduct as AddProductContainer };
