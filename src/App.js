import Header from "./components/Header";
import Footer from "./components/Footer";
import Boost from "./components/Boost";
import Advanced from "./components/Advanced";
import Showcase from "./components/Showcase";
import Shortener from "./components/Shortener";
function App() {
  return (
    <div className="App">
      <Header />
      <Showcase />
      <Shortener />
      <Advanced />
      <Boost />
      <Footer />
    </div>
  );
}

export default App;
