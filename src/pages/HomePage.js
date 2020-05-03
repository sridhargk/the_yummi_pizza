import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductComponent from "../components/ProductComponent";
import CartComponent from "../components/CartComponent";
import { getPriceInEuros } from "../utils";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorizedProducts: [
        {
          id: 1,
          name: "Category 1",
          description: "Category description",
          products: [
            {
              id: 1,
              image: "https://images.dominos.co.in/new_margherita_2502.jpg",
              prices: [
                {
                  id: 3,
                  size: "Regular",
                  description: "Handtossed regular size pizza",
                  price: 99,
                },
                {
                  id: 4,
                  size: "Medium",
                  description: "Handtossed medium size pizza",
                  price: 199,
                },
                {
                  id: 5,
                  size: "Large",
                  description: "Handtossed large size pizza",
                  price: 299,
                },
              ],
              name: "Margherita",
              description: "A classic delight with 100% Real mozzarella cheese",
            },
          ],
        },
      ],
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
      subTotal: 200,
    };
    this.addToCart = this.addToCart.bind(this);
  }
  addToCart(cartItem) {
    console.log("Item to be added in cart: ", cartItem);
  }
  render() {
    return (
      <div className="main-section">
        <Container fluid>
          <Row>
            <Col md={9}>
              {this.state.categorizedProducts.map((categorized) => {
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
              })}
            </Col>
            <Col md={3}>
              <div className="sub-heading">
                <div className="sub-heading-title">Cart</div>
              </div>
              <div className="cart-container">
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
