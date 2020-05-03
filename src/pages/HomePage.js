import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ProductComponent from "../components/ProductComponent";
import CartComponent from "../components/CartComponent";
import { getPriceInEuros } from "../utils";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorizedProducts: [],
      cartItems: [],
      subTotal: 0,
    };
    this.addToCart = this.addToCart.bind(this);
  }
  addToCart(cartItem) {
    console.log("Item to be added in cart: ", cartItem);
  }
  render() {
    let cartContainerData;
    if (this.state.cartItems.length > 0) {
      cartContainerData = (
        <div>
          <hr className="container-header"></hr>
          <div className="cart-items">
            {this.state.cartItems.map((cartItem) => {
              return (
                <CartComponent
                  key={cartItem.id}
                  cartItem={cartItem}
                  displayPage="homePage"
                />
              );
            })}
          </div>
          <div className="container-footer">
            <div className="footer-price-container">
              <span className="ftr-cntnr-title">Sub Total</span>
              <span className="ftr-cntnr-price">
                {getPriceInEuros(this.state.subTotal)}
              </span>
            </div>
            <div className="footer-btn-container">
              <Button variant="secondary" block href="/checkout">
                <b>CHECKOUT</b>
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      cartContainerData = (
        <div>
          <div className="cart-text-wrapper">
            <span className="main-text">YOUR CART IS EMPTY</span>
            <span className="sub-text">
              Please add some items from the menu.
            </span>
          </div>
        </div>
      );
    }
    return (
      <div className="main-section">
        <Container fluid>
          <Row>
            <Col md={9}>
              {this.state.categorizedProducts.length > 0 ? (
                this.state.categorizedProducts.map((categorized) => {
                  return (
                    <div className="category-section" key={categorized.id}>
                      <div className="sub-heading">
                        <div className="sub-heading-title">
                          {categorized.name}
                        </div>
                      </div>
                      <Container fluid className="category-products-container">
                        <Row key={categorized.id}>
                          <Col md={4}>
                            {categorized.products.map((product) => {
                              return (
                                <ProductComponent
                                  key={product.id}
                                  product={product}
                                  triggerAddToCart={this.addToCart}
                                />
                              );
                            })}
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  );
                })
              ) : (
                <Card className="no-product-card">
                  <Card.Body>
                    <Card.Title>No Products Found.</Card.Title>
                    <Card.Subtitle>
                      Try adding in backend or inform dev
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col md={3}>
              <div className="sub-heading">
                <div className="sub-heading-title">Cart</div>
              </div>
              <div className="cart-container">{cartContainerData}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
