import React, { Component } from "react";
import { Table, Container } from "reactstrap";
import Moment from "react-moment";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.data);
    return (
      <Container>
        <br />
        <h1>
          <b>Admin - Email Database</b>
        </h1>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data
              ? this.props.data.map(info => {
                  return (
                    <tr>
                      <th scope="row">
                        {this.props.data.findIndex(x => x.date === info.date) +
                          1}
                      </th>
                      <td>{info.email}</td>
                      <td>
                        <Moment format="MMM Do YYYY, h:mm a">
                          {info.date}
                        </Moment>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Admin;
