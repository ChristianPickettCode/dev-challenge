import React, { Component } from "react";

import { FormGroup, Label, Input, Col, Button, Alert } from "reactstrap";

class FormComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      valid: true,
      success: false,
      failed: false
    };
  }
  onSubmitClick = e => {
    // Prevent form default actions
    e.preventDefault();

    // Validate Email with regex
    let validEmail = this.state.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );

    if (validEmail) {
      // Call api for POST
      fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.state.email })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          // If successfully inserted email to db
          if (data.email) {
            // Clear input and present success alert
            this.setState({
              email: ""
            });
            this.setState({ valid: true, success: true });
          } else {
            this.setState({ failed: true });
            this.setState({ success: false });
          }
        });
    } else {
      this.setState({ valid: false });
      this.setState({ success: false });
    }
  };
  onInputChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  render() {
    return (
      <div>
        <FormGroup row>
          {/* <Label for="exampleEmail" sm={2}>
            Email
          </Label> */}
          <Col sm={12}>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Enter email..."
              onChange={this.onInputChange}
              value={this.state.email}
            />
          </Col>
        </FormGroup>
        <Alert color="success" hidden={!this.state.success}>
          Successfully submitted email
        </Alert>
        <Alert color="danger" hidden={this.state.valid}>
          Invalid Email
        </Alert>
        <Alert color="danger" hidden={!this.state.failed}>
          Failed sumbitted email, please try again
        </Alert>
        <FormGroup check row>
          <Button onClick={this.onSubmitClick}>Submit</Button>
        </FormGroup>
      </div>
    );
  }
}

export default FormComp;
