import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

import Home from './components/Home';
import Multiple from './components/Multiple'

export default class App extends Component {
  render() {
    return (
      <Router>
          <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand id="brand" href="/home">Plan Your Trip</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/get-multiple">Get Multiple</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/get-multiple" component={Multiple}/>
          </Switch>
      </Router>
    );
  }
}
