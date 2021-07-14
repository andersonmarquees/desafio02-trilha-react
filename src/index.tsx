import { render } from "react-dom";

import { App } from "./App";

import { MovieContextProvider } from "./context/MovieContext";

render(
  <MovieContextProvider>
    <App />
  </MovieContextProvider>,
  document.getElementById("root")
);
