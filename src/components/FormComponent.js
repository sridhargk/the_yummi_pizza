import React, { Component } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import LoaderComponent from "../components/LoaderComponent";

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getCustomer: {
        email: "",
      },
      customer: {
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
      existingCustomer: false,
      loading: false,
    };

    this.handleAddCustomer = this.handleAddCustomer.bind(this);
    this.handleGetCustomer = this.handleGetCustomer.bind(this);
    this.saveCustomerDetails = this.saveCustomerDetails.bind(this);
    this.getCustomerDetails = this.getCustomerDetails.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.inputChangeHandler2 = this.inputChangeHandler2.bind(this);
    this.handleCloseSidePanel = this.handleCloseSidePanel.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert = () => {
    this.setState({
      alert: {
        show: false,
      },
    });
  };

  handleAddCustomer = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({
        validated: false,
      });
    } else {
      this.setState({
        loading: true,
      });
      this.saveCustomerDetails(this.state.customer);
    }
    this.setState({ setValidated: true });
  };

  handleGetCustomer = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.getCustomer.email) {
      this.setState({
        loading: true,
      });
      this.getCustomerDetails(this.state.getCustomer.email);
    } else {
      this.setState({
        alert: {
          variant: "danger",
          message: "Please enter a valid email address",
          show: true,
        },
      });
    }
  };

  getCustomerDetails = (email) => {
    fetch(process.env.REACT_APP_API_URL + "/customer_by_email", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .then((response) => {
        if (response.success) {
          if (response.data.length > 0) {
            this.setState({
              customer: response.data[0],
              existingCustomer: true,
              loading: false,
            });
          } else {
            this.setState({
              loading: false,
              alert: {
                variant: "warning",
                message:
                  "Customer Email is not registered, Please proceed as New Customer",
                show: true,
              },
              customer: {
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                address: "",
                house_number: "",
                locality: "",
              },
              existingCustomer: false,
            });
          }
        } else {
          console.error(response);
          this.setState({
            alert: {
              variant: "danger",
              message: response.message,
              show: true,
            },
            loading: false,
          });
        }
      });
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
          loading: false,
        });
      })
      .then((responseData) => {
        if (responseData.success) {
          this.setState({
            alert: {
              variant: "success",
              message: responseData.message,
              show: true,
            },
            loading: false,
          });
          setTimeout(() => {
            // Trigger Save Order
            this.props.triggerOrderSave(responseData.data);
          }, 2000);
        } else {
          const warningMessage = responseData.data.email ? (
            responseData.data.email[0]
          ) : (
            <>
              <Alert.Heading>{responseData.message}</Alert.Heading>
              <pre>{JSON.stringify(responseData.data, null, 4)}</pre>
            </>
          );
          this.setState({
            alert: {
              variant: "warning",
              message: warningMessage,
              show: true,
            },
            loading: false,
          });
        }
      });
  };

  inputChangeHandler(e) {
    let customer = { ...this.state.customer };
    customer[e.target.name] = e.target.value;
    this.setState({
      customer,
    });
  }

  inputChangeHandler2(e) {
    let getCustomer = { ...this.state.getCustomer };
    getCustomer[e.target.name] = e.target.value;
    this.setState({
      getCustomer,
    });
  }

  handleCloseSidePanel() {
    this.props.triggerCloseSidePanel();
  }

  render() {
    const {
      validated,
      alert,
      loading,
      customer,
      getCustomer,
      existingCustomer,
    } = this.state;

    const newCustomerForm = (
      <>
        <div className="form-heading">New Customer</div>
        <Form
          key="newCustomerForm"
          class="new-customer-form"
          validated={validated}
          onSubmit={this.handleAddCustomer}
          style={{ paddingBottom: "4rem" }}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="first_name"
                onChange={(e) => this.inputChangeHandler.call(this, e)}
                value={customer.first_name}
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
                value={customer.last_name}
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
                value={customer.phone}
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
                value={customer.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="formGridHouseNo">
              <Form.Control
                type="text"
                placeholder="House No"
                name="house_number"
                onChange={(e) => this.inputChangeHandler.call(this, e)}
                value={customer.house_number}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid house number
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="8" controlId="formGridAddress">
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                onChange={(e) => this.inputChangeHandler.call(this, e)}
                value={customer.address}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address
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
                value={customer.locality}
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
      </>
    );

    const existingCustomerForm = (
      <>
        <div className="form-heading">Existing Customer</div>
        <Form
          key="existingCustomerForm"
          validated={validated}
          onSubmit={this.handleGetCustomer}
        >
          <Form.Row>
            <Form.Group as={Col} md="7" controlId="formGridEmailAddress">
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={(e) => this.inputChangeHandler2.call(this, e)}
                value={getCustomer.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address
              </Form.Control.Feedback>
            </Form.Group>
            <Col md="5">
              <Button variant="secondary" type="submit" block>
                Get Address
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </>
    );

    const existingCustomerDisplay = (
      <div className="display-wrapper">
        <Row>
          <Col>
            <div className="display-title">First Name</div>
            <div className="display-value">{customer.first_name}</div>
          </Col>
          <Col>
            <div className="display-title">Last Name</div>
            <div className="display-value">{customer.last_name}</div>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <div className="display-title">Mobile No</div>
            <div className="display-value">{customer.phone}</div>
          </Col>
          <Col md={7}>
            <div className="display-title">Email Address</div>
            <div className="display-value">{customer.email}</div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className="display-title">House No</div>
            <div className="display-value">{customer.house_number}</div>
          </Col>
          <Col md={8}>
            <div className="display-title">Address</div>
            <div className="display-value">{customer.address}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="display-title">Locality</div>
            <div className="display-value">{customer.locality}</div>
          </Col>
        </Row>
        <Button
          variant="secondary"
          block
          onClick={() => this.props.triggerOrderSave(customer)}
        >
          Proceed
        </Button>
      </div>
    );

    return (
      <>
        <div className="overlay"></div>
        <div className="cross-close-btn" onClick={this.handleCloseSidePanel}>
          <span>esc</span>
          <div className="cross-btn"></div>
        </div>
        <div className="side-navigation">
          <LoaderComponent loading={loading} />
          <div className="overlay-child">
            <div className="wrap">
              <Alert
                variant={alert.variant}
                show={alert.show}
                onClose={this.closeAlert}
                dismissible
              >
                {alert.message}
              </Alert>
              <div className="header-title">
                <span>Add Address</span>
              </div>
              {existingCustomerForm}
              <hr></hr>
              {existingCustomer ? existingCustomerDisplay : newCustomerForm}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default FormComponent;
