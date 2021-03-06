import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import MarkersOnMap from 'markers-on-map-react';
import Table from './Table';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.getCity = this.getCity.bind(this);

    this.state = {
      cities: [],
      locations: [],
      center: { lat: 38.50, long: -96.00 }
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
    MarkersOnMap.Run('div#GoogleMap');
  }

  getCity() {
    axios.get(`${process.env.REACT_APP_baseURL}/cities/single`).then((response) => {
      let place = encodeURIComponent(response.data.city_ascii + " " + response.data.state_id + " USA")

      axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + place + "&key=" + process.env.REACT_APP_GOOGLE_API_KEY)
          .then((result) => {
            const cities = this.state.cities.concat({
              city: response.data.city_ascii,
              state: response.data.state_id
            });

            const locations = this.state.locations.concat({
              lat: result.data.results[0].geometry.location.lat,
              long: result.data.results[0].geometry.location.lng
            });

            this.setState({ cities: cities, locations: locations });

            const remap = locations.map((entry, index) => {
              return ({
                "markerLat": entry.lat,
                "markerLong": entry.long
              })
            })

            MarkersOnMap.Remarker(remap);
          })
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
                  </Card.Text>
                  <Button variant="primary" onClick={this.getCity}>
                    Go somewhere
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col id="table-col" xs={6}>
              <Table cities={this.state.cities}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
