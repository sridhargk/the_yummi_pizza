import React, { Component } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { getPriceInEuros } from "../utils";

class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: {
        size: this.props.product.prices[0].size,
        price: this.props.product.prices[0].price,
        description: this.props.product.prices[0].description,
      },
    };

    this.onSizeChange = this.onSizeChange.bind(this);
    this.onAddToCartBtnClick = this.onAddToCartBtnClick.bind(this);
  }
  onSizeChange(eventKey) {
    let selectedSize = JSON.parse(eventKey);
    this.setState({
      selectedSize: {
        size: selectedSize.size,
        price: selectedSize.price,
        description: selectedSize.description,
      },
    });
  }
  onAddToCartBtnClick() {
    this.props.triggerAddToCart({
      name: this.props.product.name + " - " + this.state.selectedSize.size,
      description:
        this.props.product.description +
        " - " +
        this.state.selectedSize.description,
      price: this.state.selectedSize.price,
      image: this.props.product.image,
      id: this.props.product.id,
      quantity: 1,
    });
  }
  render() {
    const { product } = this.props;
    return (
      <Card key={product.id}>
        <div className="image-wrapper">
          <Card.Img
            variant="top"
            src={product.image}
            className="custom-card-image"
          />
          <div className="shadow-image-over"></div>
          <h5 className="image-text">
            {getPriceInEuros(this.state.selectedSize.price)}
          </h5>
        </div>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <div className="action-container">
            <Dropdown
              className="dropdown-section"
              key={product.id}
              drop="down"
              onSelect={this.onSizeChange}
            >
              <div className="dropdown-label">Size</div>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                size="sm"
              >
                {this.state.selectedSize.size}
                <div className="arrow"></div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {product.prices.map((sizePrice) => (
                  <Dropdown.Item
                    eventKey={JSON.stringify(sizePrice)}
                    key={sizePrice.id}
                  >
                    <span className="product-size-container">
                      <span className="size">
                        <span className="size-name">
                          <b>{sizePrice.size}</b>
                        </span>
                        <span className="size-description">
                          {sizePrice.description}
                        </span>
                      </span>
                      <span className="price">
                        <b>{getPriceInEuros(sizePrice.price)}</b>
                      </span>
                    </span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="action-button-section">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={this.onAddToCartBtnClick}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductComponent;
