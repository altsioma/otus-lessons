import React from "react";
import { Currency } from "@/modules/Currency";
import { store } from "@/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Currency />
    </Provider>
  );
};

export default App;
