import "./App.css";

// Importing Layout
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

// Importing Pages
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
