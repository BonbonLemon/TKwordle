import React from "react";

import "./App.scss";

import HowToPlay from "./component/HowToPlay";
import PersonAutocomplete from "./component/PersonAutocomplete";

function TKwordle() {
  return (
    <div className="App">
      <h1>TKwordle</h1>
      <HowToPlay />
      <PersonAutocomplete />
    </div>
  );
}

export default TKwordle;
