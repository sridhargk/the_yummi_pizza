import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { getPriceInEuros } from "../utils";

class CartComponent extends Component {
  render() {
    const { cartItem, displayPage } = this.props;
    if (displayPage === "homePage") {
      return (
        <div className="display-type1">
          <Row key={cartItem.id} className="main-row">
            <Col sm={4}>
              <div
                className="cart-image-wrapper"
                style={{ backgroundImage: "url(" + cartItem.image + ")" }}
              ></div>
            </Col>
            <Col sm={8}>
              <span className="cart-product">
                <span className="cart-product-name">{cartItem.name}</span>
                <span className="cart-product-description">
                  {cartItem.description}
                </span>
              </span>
            </Col>
            <Row className="cart-data-section">
              <Col sm={6} className="cart-quantity-section">
                <div className="quantity-box">
                  <div
                    className={`decrease-btn-box ${
                      cartItem.quantity > 1 ? "minus-icon" : ""
                    }`}
                  ></div>
                  <span className="quantity-value">{cartItem.quantity}</span>
                  <div className="increase-btn-box"></div>
                </div>
              </Col>
              <Col sm={6} className="cart-price">
                {getPriceInEuros(cartItem.price)}
              </Col>
            </Row>
          </Row>
        </div>
      );
    } else if (displayPage === "checkoutPage") {
      return (
        <div className="display-type2">
          <Row className="main-row">
            <Col>
              <div className="flex">
                <div
                  className="image-container"
                  style={{ backgroundImage: "url(" + cartItem.image + ")" }}
                ></div>
                <div className="item-container">
                  <Row>
                    <Col sm={9}>
                      <span className="cart-item-data">
                        <span className="cart-item-name">{cartItem.name}</span>
                        <span className="cart-item-description">
                          {cartItem.description}
                        </span>
                      </span>
                    </Col>
                    <Col sm={3} className="last-col">
                      <div className="cart-item-price-container">
                        <span className="cart-item-price">
                          {getPriceInEuros(cartItem.price)}
                        </span>
                      </div>
                      <div className="cart-item-quantity-container">
                        <div className="quantity-box">
                          <div
                            className={`decrease-btn-box ${
                              cartItem.quantity > 1 ? "minus-icon" : ""
                            }`}
                          ></div>
                          <span className="quantity-value">
                            {cartItem.quantity}
                          </span>
                          <div className="increase-btn-box"></div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      );
    } else {
      return <div>No displayPage passed</div>;
    }
  }
}

export default CartComponent;
