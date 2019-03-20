import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import FormComp from "./components/FormComp";
import Admin from "./components/Admin";

import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    fetch("/api/form")
      .then(response => response.json())
      .then(data => {
        // Reverse data array
        let copyArr = Object.assign({}, data);
        data.reverse();

        this.setState({ dbData: data });
      });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={props => {
              return (
                <Container style={{ width: "60%", marginTop: "20%" }}>
                  <h1>McHacks</h1>
                  <FormComp />
                </Container>
              );
            }}
          />

          <Route
            path="/admin"
            render={props => {
              return <Admin {...props} data={this.state.dbData} />;
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
