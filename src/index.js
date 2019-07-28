import React from "react";
import ReactDOM from "react-dom";
import TwitchALizer from "./TwitchALizer";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <TwitchALizer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
