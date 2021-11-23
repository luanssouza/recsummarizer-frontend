import React, { Component } from "react";

// Bootstrap imports
import { Card, Col, Container, Row } from "react-bootstrap";
import SearchBar from "../../components/SearchBar/SearchBar";

// React Stars
import ReactStars from "react-rating-stars-component";

// Services
import {
  getItens,
  getItensByTitle,
  getRecommendation,
} from "../../services/recommender";

// Redux
import { connect } from "react-redux";
import { ADD_RECOMMENDATION } from "../../store/actions/actionsConst";

// Components
import FloatButton from "../../components/FloatButton/FloatButton";
import ModalItens from "../../components/ModalItens/ModalItens";

class Itens extends Component {
  state = {
    itens: [],
    profileItens: {},
    modalShow: false,
  };

  constructor(props) {
    super(props);
    this.onInit();
  }

  onInit = () => {
    this.props.loader(
      getItens().then((response) => {
        this.setState({ itens: response.data });
      })
    );
  };

  handleNext = () => {
    let profileItens = this.state.profileItens;

    let itens = [];

    for (let [key, value] of Object.entries(profileItens)) {
      itens.push({ movie_id: key, rating: value.rate });
    }

    this.props.loader(
      getRecommendation(itens).then((response) => {
        let recommendations = response.data;
        this.props.onSubmitRecommendation(recommendations);

        this.props.history.push("/recommendation");
      })
    );
  };

  onSearch = (title) => {
    this.props.loader(
      getItensByTitle(title).then((response) => {
        this.setState({ itens: response.data });
      })
    );
  };

  onRate = (id, rate) => {
    let profileItens = this.state.profileItens;
    let item = this.state.itens[id];
    profileItens[item.movie_id] = { ...item, ...{ rate: rate } };
    this.setState({ profileItens });
  };

  onDelete = (key) => {
    let profileItens = this.state.profileItens;
    delete profileItens[key];
    this.setState({ profileItens: profileItens });
  };

  onModalChange = () => {
    this.setState({ modalShow: !this.state.modalShow });
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
                    <ReactStars
                      count={5}
                      size={30}
                      activeColor="#ffd700"
                      onChange={(rate) => this.onRate(index, rate)}
                    />
                    {/* <Button variant="primary">Like</Button> */}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <FloatButton buttonFunction={this.handleNext} title="Next" num={1} />
        <FloatButton
          buttonFunction={this.onModalChange}
          title="Itens"
          num={2}
          disabled={Object.keys(this.state.profileItens).length === 0}
        />
        <ModalItens
          show={this.state.modalShow}
          onHide={this.onModalChange}
          itens={this.state.profileItens}
          onDelete={this.onDelete}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendations: state.recommendations,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitRecommendation: (value) =>
    dispatch({ type: ADD_RECOMMENDATION, payload: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Itens);
