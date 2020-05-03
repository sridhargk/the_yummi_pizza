import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <Navbar
          bg="primary"
          variant="dark"
          sticky="top"
          className="shadowed-nav"
        >
          <Navbar.Brand className="logo-font" href="/">
            <img
              alt=""
              src={require("../images/pizza512.png")}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            The Yummi Pizza
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default HeaderComponent;
