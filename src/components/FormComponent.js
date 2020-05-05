import React, { Component } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getCustomer: {
        email: "",
      },
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
      alert: {
        variant: "",
        message: "",
        show: false,
      },
    };

    this.handleAddCustomer = this.handleAddCustomer.bind(this);
    this.handleGetCustomer = this.handleGetCustomer.bind(this);
    this.saveCustomerDetails = this.saveCustomerDetails.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.handleCloseSidePanel = this.handleCloseSidePanel.bind(this);
  }

  handleAddCustomer = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({
        validated: false,
      });
    } else {
      this.saveCustomerDetails(this.state.formFields);
    }

    this.setState({ setValidated: true });
  };

  handleGetCustomer = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.getCustomer.email) {
    }
  };

  saveCustomerDetails = (formData) => {
    fetch(process.env.REACT_APP_API_URL + "/customers", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        this.setState({
          alert: {
            variant: "danger",
            message: error.message,
            show: true,
          },
        });
      })
      .then((responseData) => {
        if (responseData.success) {
          this.setState({
            alert: {
              variant: "success",
              message: responseData.message,
              state: true,
            },
          });
          setTimeout(() => {
            // Trigger Save Order
            this.props.triggerOrderSave();
          }, 2000);
        } else {
          this.setState({
            alert: {
              variant: "warning",
              message: responseData.message,
              state: true,
            },
          });
        }
      });
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
    const { validated, alert } = this.state;
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
              <Alert variant={alert.variant} show={alert.show} dismissible>
                {alert.message}
              </Alert>
              <div className="header-title">
                <span>Add Address</span>
              </div>
              <div className="form-heading">Existing Customer</div>
              <Form
                key="existingCustomer"
                validated={validated}
                onSubmit={this.handleGetCustomer}
              ></Form>
              <div className="form-heading">Fill details below</div>
              <Form
                key="newCustomer"
                validated={validated}
                onSubmit={this.handleAddCustomer}
              >
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
