import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CartComponent from "../components/CartComponent";
import { getPriceInEuros } from "../utils";
import { addQuantity, subtractQuantity } from "../actions/cartActions";
import { connect } from "react-redux";

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleSubtractQuantity = this.handleSubtractQuantity.bind(this);
  }
  handleAddQuantity = (cartItem) => {
    this.props.addQuantity(cartItem);
  };
  handleSubtractQuantity = (cartItem) => {
    this.props.subtractQuantity(cartItem);
  };
  render() {
    let { cartItems, subTotal, tax, payableAmount } = this.props;
    let totalQuantity = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    subTotal = cartItems.reduce(
      (accumulator, item) => accumulator + item.price,
      0
    );
    tax = (subTotal * 7) / 100;
    payableAmount = totalQuantity > 10 ? 10 + subTotal + tax : subTotal + tax;
    let cartItemContainer;
    let priceDetailsContainer;
    if (cartItems.length > 0) {
      cartItemContainer = (
        <div>
          <div className="sub-heading">
            <span className="sub-heading-title">
              {totalQuantity} Items you have selected
            </span>
          </div>
          {cartItems.map((cartItem) => {
            return (
              <CartComponent
                key={cartItem.id}
                cartItem={cartItem}
                displayPage="checkoutPage"
                triggerAddQuantityBtn={this.handleAddQuantity}
                triggerSubtractQuantityBtn={this.handleSubtractQuantity}
              />
            );
          })}
        </div>
      );
      priceDetailsContainer = (
        <div>
          <div className="sub-heading">
            <span className="sub-heading-title">Price Details</span>
          </div>
          <div className="data-card">
            <div className="data-card-innerwrap">
              <div className="text-wrapper">
                <span className="text-title">Sub Total</span>
                <span className="text-value">{getPriceInEuros(subTotal)}</span>
              </div>
              <div className="text-wrapper">
                <span className="text-title">Tax - VAT @ 7%</span>
                <span className="text-value">{getPriceInEuros(tax)}</span>
              </div>
              {totalQuantity > 10 ? (
                <div className="text-wrapper">
                  <span className="text-title">Delivery</span>
                  <span className="text-value">{getPriceInEuros(10)}</span>
                </div>
              ) : (
                ""
              )}
              <div className="text-wrapper text-total">
                <span className="text-title">Grand Total</span>
                <span className="text-value">
                  {getPriceInEuros(payableAmount)}
                </span>
              </div>
              <div className="data-btn-container">
                <Button variant="secondary" block>
                  PLACE ORDER
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      cartItemContainer = (
        <div className="empty-cart">
          <div className="cart-text-wrapper">
            <span className="main-text">YOUR CART IS EMPTY</span>
            <span className="sub-text">
              Please add some items from the menu.
            </span>
            <Button href="/" variant="secondary">
              EXPLORE MENU
            </Button>
          </div>
        </div>
      );
      priceDetailsContainer = "";
    }
    return (
      <div className="main-section">
        <Container fluid>
          <Row>
            <Col sm={9}>{cartItemContainer}</Col>
            <Col sm={3}>{priceDetailsContainer}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ cartItems }) => {
  return {
    cartItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    subtractQuantity: (cartItem) => {
      dispatch(subtractQuantity(cartItem));
    },
    addQuantity: (cartItem) => {
      dispatch(addQuantity(cartItem));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
