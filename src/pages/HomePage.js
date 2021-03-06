import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import LoaderComponent from "../components/LoaderComponent";
import ProductComponent from "../components/ProductComponent";
import CartComponent from "../components/CartComponent";
import { getPriceInEuros } from "../utils";
import {
  addToCart,
  addQuantity,
  subtractQuantity,
  removeItems,
} from "../actions/cartActions";
import { connect } from "react-redux";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleSubtractQuantity = this.handleSubtractQuantity.bind(this);
  }
  handleAddToCart(cartItem) {
    this.props.addToCart(cartItem);
  }
  handleAddQuantity = (cartItem) => {
    this.props.addQuantity(cartItem);
  };
  handleSubtractQuantity = (cartItem) => {
    this.props.subtractQuantity(cartItem);
  };
  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + "/products")
      .then((response) => response.json())
      .then(
        (result) => {
          if (result.data.length === 0) {
            this.props.removeItems([]);
          }
          this.setState({
            products: result.data,
            loading: false,
          });
        },
        (error) => {
          console.error(error);
          this.props.removeItems([]);
          this.setState({ loading: false });
        }
      );
  }
  render() {
    const { products, loading } = this.state;
    const { cartItems } = this.props;
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
                  triggerAddQuantityBtn={this.handleAddQuantity}
                  triggerSubtractQuantityBtn={this.handleSubtractQuantity}
                />
              );
            })}
          </div>
          <div className="container-footer">
            <div className="footer-price-container">
              <span className="ftr-cntnr-title">Sub Total</span>
              <span className="ftr-cntnr-price">
                {getPriceInEuros(
                  cartItems.reduce(
                    (accumulator, item) => accumulator + item.price,
                    0
                  )
                )}
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
        <LoaderComponent loading={loading} />
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
                                triggerAddToCart={this.handleAddToCart}
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

const mapStateToProps = ({ cartItems }) => {
  return {
    cartItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (cartItem) => {
      dispatch(addToCart(cartItem));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
