import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

class LoaderComponent extends Component {
  render() {
    let { loading } = this.props;
    return (
      <>
        {loading === true ? (
          <div className="main-loader-wrapper">
            <Spinner animation="border" variant="secondary" size="lg" />
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
export default LoaderComponent;
