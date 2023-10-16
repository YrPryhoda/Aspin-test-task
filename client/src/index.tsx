import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";

import { router } from "./router";
import { store } from "./store";
import "./static/css/reset.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
