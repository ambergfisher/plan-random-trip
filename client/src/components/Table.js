import React, { Component } from "react";
import { default as Tb } from "react-bootstrap/Table";
import "../styles/Table.css";

class Table extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <Tb striped bordered hover>
        <thead>
          <tr>
            <th id="city">City</th>
            <th id="state">State</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cities.map((entry, index) => (
            <tr>
              <td>{entry.city}</td>
              <td>{entry.state}</td>
            </tr>
          ))}
        </tbody>
      </Tb>
    );
  }
}

export default Table;
