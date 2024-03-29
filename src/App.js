import "./App.css";

import React, { Component } from "react";

// Importing React Router
import { Redirect, Route, Switch } from "react-router-dom";

// Importing Layout
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

// Importing Pages
import Home from "./pages/Home/Home";
import Demographic from "./pages/Domagraphic/Demographic";
import items from "./pages/Items/Items";
import Recommendation from "./pages/Recommendation/Recommendation";
import ItemTries from "./pages/ItemTries/ItemTries";
import Explanation from "./pages/Explanation/Explanation";
import Final from "./pages/Final/Final";
import Error from "./pages/Error/Error";

// Importing Components
import Loader from "./components/Loading/Loader";
import { connect } from "react-redux";
import ModalError from "./components/ModalError/ModalError";

class App extends Component {
  state = { loading: true, modalError: false };

  loaderFunction = (fn) => {
    this.setState({ loading: false });
    fn.catch(() => this.onModalErrorChange()).finally(() =>
      this.setState({ loading: true })
    );
  };

  onModalErrorChange = () => {
    this.setState({ modalError: !this.state.modalError });
  };

  loaderComponent = (Page) => {
    return (props) => <Page {...props} loader={this.loaderFunction} />;
  };

  isUser = (Component, routeProps) =>
    this.props.user.user ? (
      <Component {...routeProps} loader={this.loaderFunction} />
    ) : (
      <Redirect to="/" />
    );

  render() {
    return (
      <div className="App">
        <Loader hidden={this.state.loading} />
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/demographic"
              render={this.loaderComponent(Demographic)}
            />
            <Route
              exact
              path="/items"
              render={(routeProps) => this.isUser(items, routeProps)}
            />
            <Route
              exact
              path="/recommendation"
              render={(routeProps) => this.isUser(Recommendation, routeProps)}
            />
            <Route
              exact
              path="/itemTries"
              render={(routeProps) => this.isUser(ItemTries, routeProps)}
            />
            <Route
              exact
              path="/explanation"
              render={(routeProps) => this.isUser(Explanation, routeProps)}
            />
            <Route
              exact
              path="/final"
              render={this.loaderComponent(Final)}
            />
            <Route component={Error} />
          </Switch>
        </main>
        <br />
        <br />
        <Footer />
        <ModalError
          show={this.state.modalError}
          onHide={this.onModalErrorChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(App);
