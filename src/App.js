// src/App.js
import React from "react";
import "./App.css";
import CitationForm from "./CitationForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Citation Generator</h1>
        <CitationForm />
      </header>
    </div>
  );
}

export default App;
