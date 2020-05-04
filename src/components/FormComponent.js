import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        house_number: "",
        locality: "",
      },
      validated: false,
      setValidated: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.handleCloseSidePanel = this.handleCloseSidePanel.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({
        validated: false,
      });
    } else {
      this.props.triggerCustomerSave(this.state.formFields);
    }

    this.setState({ setValidated: true });
  };

  inputChangeHandler(e) {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields,
    });
  }

  handleCloseSidePanel() {
    this.props.triggerCloseSidePanel();
  }

  render() {
    const { validated } = this.state;
    return (
      <>
        <div className="overlay"></div>
        <div className="cross-close-btn" onClick={this.handleCloseSidePanel}>
          <span>esc</span>
          <div className="cross-btn"></div>
        </div>
        <div className="side-navigation">
          <div className="overlay-child">
            <div className="wrap">
              <div className="header-title">
                <span>Add Address</span>
              </div>
              <div className="form-heading">Fill details below</div>
              <Form validated={validated} onSubmit={this.handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      onChange={(e) => this.inputChangeHandler.call(this, e)}
                      value={this.state.formFields.first_name}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid first name
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      onChange={(e) => this.inputChangeHandler.call(this, e)}
                      value={this.state.formFields.last_name}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid last name
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridMobileNo">
                    <Form.Control
                      type="text"
                      placeholder="Mobile No"
                      name="phone"
                      onChange={(e) => this.inputChangeHandler.call(this, e)}
                      value={this.state.formFields.phone}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid mobile no.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmailAddress">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      onChange={(e) => this.inputChangeHandler.call(this, e)}
                      value={this.state.formFields.email}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email address
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      onChange={(e) => this.inputChangeHandler.call(this, e)}
                      value={this.state.formFields.address}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid address
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridHouseNo">
                    <Form.Control
                      type="text"
                      placeholder="House No"
                      name="house_number"
                      onChange={(e) => this.inputChangeHandler.call(this, e)}
                      value={this.state.formFields.house_number}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid house number
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridLocality">
                    <Form.Control
                      type="text"
                      placeholder="Locality"
                      name="locality"
                      onChange={(e) => this.inputChangeHandler.call(this, e)}
                      value={this.state.formFields.locality}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid locality
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Button variant="secondary" type="submit" block>
                  Save & Continue
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default FormComponent;
