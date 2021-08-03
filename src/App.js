import "./App.css";

// Importing Layout
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

// Importing Pages
import Home from "./pages/Home/Home";
import Itens from "./pages/Itens/Itens";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <Itens />
      </main>
      <Footer />
    </div>
  );
}

export default App;
