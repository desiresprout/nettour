import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import "./index.css";
import store from "store";

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
