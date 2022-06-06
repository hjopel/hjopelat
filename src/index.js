import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
const colors = {
  dark: {
    bg: "#232602",
    ac: "#e7edec",
  },
  light: {
    bg: "#ffffff",
    ac: "#303133",
  },
};
// #232692
// #e7edec

// #fef9eb
// #303133
// const theme = extendTheme({
//   colors,
//   fonts: { heading: "Old Standard TT, serif" },
// });
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
