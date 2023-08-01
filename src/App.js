import "./App.css";
import NavBar from "./components/NavBar";
import Translate from "./components/Translate";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Translate />
      <br />
      <footer>
        <h3>
          © Designed and Developed by <a href="https://github.com/SenthilTechSpot/Translator-App"> SenthilTechSpot</a>
        </h3>
      </footer>
    </div>
  );
}

export default App;
