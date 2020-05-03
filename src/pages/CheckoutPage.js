import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CartComponent from "../components/CartComponent";

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [
        {
          id: 2,
          name: "Product1 - Size1",
          description: "Lorem Ipsum Lorem IpsumLorem IpsumLorem Ipsum",
          price: 99,
          image: "https://images.dominos.co.in/new_margherita_2502.jpg",
          quantity: 1,
        },
      ],
    };
  }
  render() {
    return (
      <div className="main-section">
        <Container fluid>
          <Row>
            <Col sm={9}>
              <div className="sub-heading">
                <span className="sub-heading-title">
                  0 Items you have selected
                </span>
              </div>
              {this.state.cartItems.map((cartItem) => {
                return (
                  <CartComponent
                    key={cartItem.id}
                    cartItem={cartItem}
                    displayPage="checkoutPage"
                  />
                );
              })}
            </Col>
            <Col sm={3}>
              <div className="sub-heading">
                <span className="sub-heading-title">
                  Choose a delivery address
                </span>
              </div>
              <div className="data-card"></div>
              <div className="sub-heading">
                <span className="sub-heading-title">Price Details</span>
              </div>
              <div className="data-card">
                <div className="data-card-innerwrap">
                  <div className="text-wrapper">
                    <span className="text-title">Sub Total</span>
                    <span className="text-value">0000</span>
                  </div>
                  <div className="text-wrapper">
                    <span className="text-title">Tax</span>
                    <span className="text-value">0000</span>
                  </div>
                  <div className="text-wrapper text-total">
                    <span className="text-title">Grand Total</span>
                    <span className="text-value">0000</span>
                  </div>
                  <div className="data-btn-container">
                    <Button variant="secondary" block>
                      PLACE ORDER
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CheckoutPage;
