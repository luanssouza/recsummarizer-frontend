import React, { Component } from "react";

// Bootstrap imports
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SearchBar from "../../components/SearchBar/SearchBar";

// Services
import { getItensByTitle } from "../../services/recommender";

class Itens extends Component {
  state = {
    itens: [
      {
        title: "Cassino Royale",
        text: "",
        poster: "/007_poster.jpg",
      },
      {
        title: "Shrek",
        text: "",
        poster: "/shrek_poster.png",
      },
      {
        title: "The Lord of the Rings",
        text: "",
        poster: "/lor_poster.jpg",
      },
    ],
    profileItens: [],
  };

  handleNext = (event) => {
    event.preventDefault();

    this.props.history.push("/recommendation");
  };

  onSearch = (title) => {
    getItensByTitle(title).then((response) => {
      this.setState({ itens: response.data });
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <SearchBar onSearch={this.onSearch} />
        </Row>
        <Row>
          {this.state.itens.map((item, index) => {
            return (
              <Col md={4} key={index}>
                <Card>
                  <Card.Header as="h5">{item.title}</Card.Header>
                  <Card.Body>
                    <Card.Img variant="top" src={item.poster} />
                    <Card.Text>{item.text}</Card.Text>
                    <Button variant="primary">Like</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 4 }}>
            <Button onClick={this.handleNext} className="float-right mt-2">
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Itens;
