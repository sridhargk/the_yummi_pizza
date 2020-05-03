import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Navbar.Brand className="logo-font" href="/">
          <img
            alt=""
            src={require("./images/pizza512.png")}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          The Yummi Pizza
        </Navbar.Brand>
      </Navbar>
      <Navbar bg="light" sticky="top" className="shadowed-nav">
        <Nav fill defaultActiveKey="/home" as="ul">
          <Nav.Item as="li">
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-1">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-2">Link</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
