import React, { Component } from "react";

// Bootstrap imports
import { Col, Container, Row } from "react-bootstrap";

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
import SearchBar from "../../components/SearchBar/SearchBar";
import FloatButton from "../../components/FloatButton/FloatButton";
import ModalItens from "../../components/ModalItens/ModalItens";
import CardItem from "../../components/CardItem/CardItem";

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
  
  componentDidMount() {
    window.scrollTo(0,0);
  }

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
        let profileItens = this.state.profileItens;
        let profileItensKeys = Object.keys(this.state.profileItens).map(Number);
        let itens = response.data;
        itens.forEach((element) => {
          if (profileItensKeys.includes(element.movie_id))
            element.rate = profileItens[element.movie_id].rate;
          else element.rate = 0;
        });
        this.setState({ itens: itens });
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
                <CardItem item={item} index={index} onRate={this.onRate} />
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
