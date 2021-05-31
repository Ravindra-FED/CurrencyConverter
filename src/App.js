import "./App.scss";
import { CurrencyConverter } from "./currency-converter/CurrencyConverter";

function App() {
  return (
    <div className="App">
      <nav>
        <a href="#">Adyen Assignment</a>
      </nav>
      <section>
        <div className="intro-text">
          <h1>
            <strong>Currency Converter</strong>
          </h1>
          <p>Today, </p>
        </div>
        <div className="converter-section">
          <CurrencyConverter />
        </div>
      </section>
    </div>
  );
}

export default App;
