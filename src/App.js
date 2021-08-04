import "./App.css";

// Importing Layout
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

// Importing Pages
import Home from "./pages/Home/Home";
import Itens from "./pages/Itens/Itens";
import Recommendation from "./pages/Recommendation/Recommendation";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <Itens />
        <Recommendation />
      </main>
      <Footer />
    </div>
  );
}

export default App;
