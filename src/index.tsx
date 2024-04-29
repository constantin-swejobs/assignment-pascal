import * as React from "react";
import ReactDOM from "react-dom";
import { InventoryProvider } from "./api/InventoryProvider";
import { ProductSelectorView } from "./views/ProductSelectorView";

import "./index.scss";

let App = () => (
  <InventoryProvider>
    <ProductSelectorView />
  </InventoryProvider>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
