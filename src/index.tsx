import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const onSave = (xml: string) => {
  console.log(xml);
};

ReactDOM.render(<App onSave={onSave} />, document.getElementById("root"));
