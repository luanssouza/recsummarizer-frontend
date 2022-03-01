import React, { Component } from "react";

// Bootstrap imports
import { Col, Container, Row } from "react-bootstrap";

// Services
import {
  getItems,
  getItemsByTitle,
  getRecommendation,
} from "../../services/recommender";

// Redux
import { connect } from "react-redux";
import {
  ADD_ITEMS,
  ADD_RECOMMENDATION,
} from "../../store/actions/actionsConst";

// Components
import SearchBar from "../../components/SearchBar/SearchBar";
import FloatButton from "../../components/FloatButton/FloatButton";
import ModalItems from "../../components/ModalItems/ModalItems";
import ModalMessage from "../../components/ModalMessage/ModalMessage";
import CardItem from "../../components/CardItem/CardItem";

class Items extends Component {
  state = {
    items: [],
    profileItems: {},
    modalShow: false,
    modalMessageError: false,
  };

  constructor(props) {
    super(props);
    this.onInit();
  }

  getItemsList = () => {
    this.props.loader(getItems().then(this.updateItems));
  };

  onInit = () => this.getItemsList();

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleNext = () => {
    let profileItems = this.state.profileItems;

    let items = [];

    for (let [key, value] of Object.entries(profileItems)) {
      items.push({ movie_id: key, rating: value.rate });
    }

    let requestBody = {
      user_id: this.props.user.user.user_id,
      rates: items,
    };

    this.props.loader(
      getRecommendation(requestBody)
        .then((response) => {
          let recommendations = response.data;
          this.props.onSubmitItems(items);
          this.props.onSubmitRecommendation(recommendations);

          this.props.history.push("/recommendation");
        })
        .catch((error) => {
          let status = error.response.status;
          if (status === 408)
            // timout
            this.onModalMessageErrorChange();
          else throw error;
        })
    );
  };

  onSearch = (title, year) => {
    this.props.loader(getItemsByTitle(title, year).then(this.updateItems));
  };

  onRate = (id, rate) => {
    let items = this.state.items;

    items[id].rate = rate;
    let item = items[id];

    let profileItems = this.state.profileItems;
    profileItems[item.movie_id] = { ...item, ...{ rate: rate } };

    this.setState({ profileItems: profileItems, items: items });
  };

  onDelete = (key) => {
    let profileItems = this.state.profileItems;
    delete profileItems[key];

    let items = this.state.items;

    this.profileItemsRates(items, profileItems);

    this.setState({ profileItems: profileItems, items: items });
  };

  onModalChange = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  onModalMessageErrorChange = () => {
    this.setState({ modalMessageError: !this.state.modalMessageError });
  };

  updateItems = (response) => {
    let profileItems = this.state.profileItems;
    let items = Array.isArray(response.data) ? response.data : [];

    this.profileItemsRates(items, profileItems);

    this.setState({ items: items });
  };

  profileItemsRates = (items, profileItems) => {
    let profileItemsKeys = Object.keys(profileItems).map(Number);
    items.forEach((element) => {
      if (profileItemsKeys.includes(element.movie_id))
        element.rate = profileItems[element.movie_id].rate;
      else element.rate = 0;
    });
  };

  profileItemsLen = () => Object.keys(this.state.profileItems).length;

  render() {
    return (
      <Container>
        <h4 className="d-flex justify-content-center text-center">
          We need to know your preferences to generate a recommendation. Please,
          rate at least 10 movies.
        </h4>
        <Row>
          <SearchBar onSearch={this.onSearch} />
        </Row>

        {this.state.items.length === 0 && (
          <h4 className="d-flex justify-content-center">
            Unfortunatly, we can't find movies.
          </h4>
        )}
        <Row>
          {this.state.items.map((item, index) => {
            return (
              <Col md={4} key={index} className="mb-3">
                <CardItem
                  item={item}
                  index={index}
                  onRate={this.onRate}
                  value={this.state.value}
                />
              </Col>
            );
          })}
        </Row>
        <FloatButton
          buttonFunction={this.handleNext}
          title="Next"
          num={1}
          disabled={this.profileItemsLen() < 10}
        />
        <FloatButton
          buttonFunction={this.onModalChange}
          title={`items ${this.profileItemsLen()}/10`}
          num={2}
          disabled={this.profileItemsLen() === 0}
        />
        <FloatButton
          buttonFunction={this.getItemsList}
          title="Get More Items"
          num={3}
        />
        <ModalItems
          show={this.state.modalShow}
          onHide={this.onModalChange}
          items={this.state.profileItems}
          onDelete={this.onDelete}
        />
        <ModalMessage
          show={this.state.modalMessageError}
          onHide={this.onModalMessageErrorChange}
          title="Error!"
          text="Please, try again or try to change or remove some movies from your list!"
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendations: state.recommendations,
  items: state.items,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitRecommendation: (value) =>
    dispatch({ type: ADD_RECOMMENDATION, payload: value }),
  onSubmitItems: (value) => dispatch({ type: ADD_ITEMS, payload: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
