import "./App.css";

// Importing Layout
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

// Importing Pages
import Home from "./pages/Home/Home";
import Demographic from "./pages/Domagraphic/Demographic";
import Itens from "./pages/Itens/Itens";
import Recommendation from "./pages/Recommendation/Recommendation";
import Explanation from "./pages/Explanation/Explanation";

// Importing React Router
import { Route, Switch } from "react-router-dom";
import Loader from "./components/Loading/Loader";

import React, { Component } from "react";

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
            <Route exact path="/demographic" component={Demographic} />

            <Route exact path="/itens" render={this.loaderComponent(Itens)} />
            <Route
              exact
              path="/recommendation"
              render={this.loaderComponent(Recommendation)}
            />
            <Route
              exact
              path="/explanation"
              render={this.loaderComponent(Explanation)}
            />
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
