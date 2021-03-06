import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-day-picker/lib/style.css';
import { unregister } from './serviceWorker';

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);

unregister();
