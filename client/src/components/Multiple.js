import React, { Component } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import MarkersOnMap from "markers-on-map-react";
import Table from "./Table";
import "../styles/Multiple.css";

export default class Multiple extends Component {
  constructor(props) {
    super(props);
    this.getCities = this.getCities.bind(this);
    this.geoCodePlace = this.geoCodePlace.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      cities: [],
      locations: [],
      center: { lat: 38.5, long: -96.0 },
    };
  }

  componentDidMount() {
    MarkersOnMap.Init({
      googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY, // required => Google Maps JavaScript API Key (in string format)
      mapCenterLat: this.state.center.lat,
      mapCenterLong: this.state.center.long,
      mapZoomLevel: 0.5,
      mapMaxZoom: 12,
      markerObjects: [
        // at least one object required
        {
          markerLat: this.state.center.lat, // marker latitude as number
          markerLong: this.state.center.long, // marker longitude as number
        },
      ],
    });

    // Select map element (ID or Class)
    MarkersOnMap.Run("div#GoogleMap");
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    this.getCities(formDataObj["numCities"])
  }

  geoCodePlace(data, place) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then((result) => {
        const cities = this.state.cities.concat({
          city: data.city_ascii,
          state: data.state_id,
        });

        const locations = this.state.locations.concat({
          lat: result.data.results[0].geometry.location.lat,
          long: result.data.results[0].geometry.location.lng,
        });

        this.setState({ cities: cities, locations: locations });

        const remap = locations.map((entry, index) => {
          return {
            markerLat: entry.lat,
            markerLong: entry.long,
          };
        });

        MarkersOnMap.Remarker(remap);
      });
  }

  getCities(numCities) {
    axios.get(`${process.env.REACT_APP_BASE_URL}/cities/multiple/${(numCities > 1 ? numCities : 1)}`).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let place = encodeURIComponent(
          response.data[i].city_ascii + " " + response.data[i].state_id + " USA"
        );
        this.geoCodePlace(response.data[i], place);
      }
    });
  }

  render() {
    return (
      <div>
        <Container fluid className="justify-content-center" id="body">
          <Row id="row">
            <Col id="card-col" xs={6}>
              <Card>
                <div id="GoogleMap"></div>
                <Card.Body>
                  <Card.Title>Create your trip</Card.Title>
                  <Card.Text>
                    Get your next trip location with a press of a button!
                    <br/>
                    Enter the number of cities you would like or leave blank
                    to get one at a time.
                  </Card.Text>
                  <Form id="form" onSubmit={this.onFormSubmit}>
                    <Row>
                      <Form.Control id="form-text" type="text" name="numCities" />
                      <Button type="submit">Go somewhere</Button>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col id="table-col" xs={6}>
              <Table cities={this.state.cities} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
