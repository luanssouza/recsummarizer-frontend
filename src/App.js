import "./App.css";

import React, { Component } from "react";

// Importing React Router
import { Route, Switch } from "react-router-dom";

// Importing Layout
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

// Importing Pages
import Home from "./pages/Home/Home";
import Demographic from "./pages/Domagraphic/Demographic";
import Itens from "./pages/Itens/Itens";
import Recommendation from "./pages/Recommendation/Recommendation";
import ItemTries from "./pages/ItemTries/ItemTries";
import Explanation from "./pages/Explanation/Explanation";
import Final from "./pages/Final/Final";

// Importing Components
import Loader from "./components/Loading/Loader";

class App extends Component {
  state = { loading: true };

  loaderFunction = (fn) => {
    this.setState({ loading: false });
    fn.finally(() => this.setState({ loading: true }));
  };

  loaderComponent = (Page) => {
    return (props) => <Page {...props} loader={this.loaderFunction} />;
  };

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
            <Route exact path="/itens" render={this.loaderComponent(Itens)} />
            <Route
              exact
              path="/recommendation"
              render={this.loaderComponent(Recommendation)}
            />
            <Route
              exact
              path="/itemTries"
              render={this.loaderComponent(ItemTries)}
            />
            <Route
              exact
              path="/explanation"
              render={this.loaderComponent(Explanation)}
            />
            <Route exact path="/final" component={Final} />
          </Switch>
        </main>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default App;
