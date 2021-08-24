import "./App.css";

// Importing Layout
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

// Importing Pages
import Home from "./pages/Home/Home";
import Demographic from "./pages/Domagraphic/Demographic";
import Itens from "./pages/Itens/Itens";
import Recommendation from "./pages/Recommendation/Recommendation";

// Importing React Router
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/demographic" component={Demographic} />
          <Route exact path="/itens" component={Itens} />
          <Route exact path="/recommendation" component={Recommendation} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
