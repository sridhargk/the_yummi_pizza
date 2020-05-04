import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CartComponent from "../components/CartComponent";
import { getPriceInEuros } from "../utils";
import { addQuantity, subtractQuantity } from "../actions/cartActions";
import { connect } from "react-redux";

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subTotal: 0,
      tax: 0,
      payableAmount: 0,
    };
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
    const { cartItems } = this.props;
    console.log(this.props);
    let cartItemContainer;
    let priceDetailsContainer;
    if (cartItems.length > 0) {
      cartItemContainer = (
        <div>
          <div className="sub-heading">
            <span className="sub-heading-title">
              {cartItems.reduce(
                (accumulator, item) => accumulator + item.quantity,
                0
              )}{" "}
              Items you have selected
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
                <span className="text-value">
                  {getPriceInEuros(this.state.subTotal)}
                </span>
              </div>
              <div className="text-wrapper">
                <span className="text-title">Tax</span>
                <span className="text-value">
                  {getPriceInEuros(this.state.tax)}
                </span>
              </div>
              <div className="text-wrapper text-total">
                <span className="text-title">Grand Total</span>
                <span className="text-value">
                  {getPriceInEuros(this.state.payableAmount)}
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
            <Col sm={3}>
              <div className="sub-heading">
                <span className="sub-heading-title">
                  Choose a delivery address
                </span>
              </div>
              <div className="data-card"></div>
              {priceDetailsContainer}
            </Col>
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
