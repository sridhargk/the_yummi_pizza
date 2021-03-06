import React, { Component } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import CartComponent from "../components/CartComponent";
import FormComponent from "../components/FormComponent";
import LoaderComponent from "../components/LoaderComponent";
import { getPriceInEuros } from "../utils";
import {
  addQuantity,
  subtractQuantity,
  removeItems,
} from "../actions/cartActions";
import { connect } from "react-redux";

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeSidePanel: true,
      order: {},
      loading: false,
      alert: {
        show: false,
      },
    };
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleSubtractQuantity = this.handleSubtractQuantity.bind(this);
    this.closeSidePanel = this.closeSidePanel.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.getPriceDetails = this.getPriceDetails.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert = () => {
    this.setState({
      alert: {
        show: false,
      },
    });
  };

  handleAddQuantity = (cartItem) => {
    this.props.addQuantity(cartItem);
  };

  handleSubtractQuantity = (cartItem) => {
    this.props.subtractQuantity(cartItem);
  };

  closeSidePanel = () => {
    this.setState({
      closeSidePanel: true,
    });
  };

  getPriceDetails = (cartItems) => {
    const totalQuantity = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    const subTotal = cartItems.reduce(
      (accumulator, item) => accumulator + item.price,
      0
    );
    const tax = (subTotal * 7) / 100;
    const payableAmount = subTotal + tax + 10;
    return {
      totalQuantity: totalQuantity,
      subTotal: subTotal,
      tax: tax,
      payableAmount: payableAmount,
    };
  };

  placeOrder = () => {
    this.setState({
      closeSidePanel: false,
    });
  };

  saveOrder = (customer) => {
    this.setState({
      loading: true,
    });
    let orderItems = [];
    const cartItems = this.props.cartItems;
    cartItems.map((cartItem) => {
      orderItems.push({
        name: cartItem.name,
        description: cartItem.description,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        price: cartItem.product_price,
        total: cartItem.price,
      });
      return cartItem;
    });
    const priceDetails = this.getPriceDetails(cartItems);
    const order = this.state.order;
    order.customer_id = customer.id;
    order.name = customer.first_name + " " + customer.last_name;
    order.delivery_address = customer.house_number + ", " + customer.address;
    order.locality = customer.locality;
    order.total_quantity = priceDetails.totalQuantity;
    order.total_amount = priceDetails.subTotal;
    order.tax = priceDetails.tax;
    order.payable_amount = priceDetails.payableAmount;
    order.items = orderItems;
    fetch(process.env.REACT_APP_API_URL + "/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => {
        this.setState({
          loading: false,
          alert: {
            variant: "danger",
            message: error.message,
            show: true,
          },
        });
        console.error(error);
      })
      .then((responseData) => {
        if (responseData.success) {
          this.setState({
            alert: {
              variant: "success",
              message: responseData.message,
              show: true,
              closeSidePanel: false,
            },
          });
          setTimeout(() => {
            this.setState({
              loading: false,
            });
            this.props.removeItems([]);
            window.location.href = "/";
          }, 3000);
        } else {
          this.setState({
            loading: false,
            alert: {
              variant: "danger",
              message: responseData.message,
              show: true,
            },
          });
        }
      });
  };

  navigateToHomePage = () => {
    window.location.href = "/";
  };

  render() {
    let { cartItems, subTotal, tax, payableAmount, totalQuantity } = this.props;
    let { closeSidePanel, loading, alert } = this.state;
    totalQuantity = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    ); // Total choosed quantity
    subTotal = cartItems.reduce(
      (accumulator, item) => accumulator + item.price,
      0
    ); // Subtotal from calculated prices
    tax = (subTotal * 7) / 100; // vat @ 7%
    payableAmount = subTotal + tax + 10;
    let cartItemContainer;
    let priceDetailsContainer;
    if (cartItems.length > 0) {
      cartItemContainer = (
        <div>
          <Row>
            <Col md="9">
              <div className="sub-heading">
                <span className="sub-heading-title">
                  {totalQuantity} Items you have selected
                </span>
              </div>
            </Col>
            <Col md="3" className="sub-heading-btn">
              <Button variant="link" onClick={this.navigateToHomePage}>
                <b>EXPLORE MORE</b>
              </Button>
            </Col>
          </Row>

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
              <div className="text-wrapper">
                <span className="text-title">Delivery</span>
                <span className="text-value">{getPriceInEuros(10)}</span>
              </div>
              <div className="text-wrapper text-total">
                <span className="text-title">Grand Total</span>
                <span className="text-value">
                  {getPriceInEuros(payableAmount)}
                </span>
              </div>
              <div className="data-btn-container">
                <Button variant="secondary" block onClick={this.placeOrder}>
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
        <LoaderComponent loading={loading} />
        <Alert
          variant={alert.variant}
          show={alert.show}
          onClose={this.closeAlert}
          dismissible
        >
          {alert.message}
        </Alert>
        <Container fluid>
          <Row>
            <Col sm={9}>{cartItemContainer}</Col>
            <Col sm={3}>{priceDetailsContainer}</Col>
          </Row>
        </Container>
        {closeSidePanel ? (
          ""
        ) : (
          <FormComponent
            triggerCloseSidePanel={this.closeSidePanel}
            triggerOrderSave={this.saveOrder}
          />
        )}
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
    removeItems: (cartItem) => {
      dispatch(removeItems(cartItem));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
