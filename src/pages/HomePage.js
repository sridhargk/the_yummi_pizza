import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ProductComponent from "../components/ProductComponent";
import CartComponent from "../components/CartComponent";
import { getPriceInEuros } from "../utils";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartItems: [],
      subTotal: 0,
    };
    this.addToCart = this.addToCart.bind(this);
  }
  updateQuantityPrice = (cart, product, productCartIndex) => {
    const cartProducts = [...cart];
    const selectedProductInCart = cartProducts[productCartIndex];
    const selectedProductQuantityUpdated = {
      ...selectedProductInCart,
      quantity: selectedProductInCart.quantity + product.quantity,
      price:
        selectedProductInCart.price *
        (selectedProductInCart.quantity + product.quantity),
    };
    cartProducts[productCartIndex] = selectedProductQuantityUpdated;
    return cartProducts;
  };
  addToCart(cartItem) {
    const productCartIndex = this.state.cartItems.findIndex(
      (item) => item.name === cartItem.name
    );
    let updatedCartItems =
      productCartIndex >= 0
        ? this.updateQuantityPrice(
            this.state.cartItems,
            cartItem,
            productCartIndex
          )
        : [...this.state.cartItems, cartItem];
    this.setState({
      cartItems: updatedCartItems,
      subTotal: updatedCartItems.reduce(
        (accumulator, item) => accumulator + item.price,
        0
      ),
    });
  }
  componentDidMount() {
    fetch("http://localhost:8000/api/products")
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          products: result.data,
        });
      });
  }
  render() {
    const { products, cartItems, subTotal } = this.state;
    let cartContainerData;
    if (cartItems.length > 0) {
      cartContainerData = (
        <div>
          <hr className="container-header"></hr>
          <div className="cart-items">
            {cartItems.map((cartItem) => {
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
                {getPriceInEuros(subTotal)}
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
              <div className="category-section">
                <div className="sub-heading">
                  <div className="sub-heading-title">Menu</div>
                </div>
                <Container fluid className="category-products-container">
                  <Row>
                    {products.length > 0 ? (
                      products.map((product) => {
                        if (product.prices.length > 0) {
                          return (
                            <Col md={4} key={product.id}>
                              <ProductComponent
                                key={product.id}
                                product={product}
                                triggerAddToCart={this.addToCart}
                              />
                            </Col>
                          );
                        } else {
                          return "";
                        }
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
                  </Row>
                </Container>
              </div>
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
