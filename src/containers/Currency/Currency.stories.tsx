import React from "react";
import { Currency } from "./Currency";
import { InitialConfig } from "../../data";

export default {
  title: "Graph Full App"
};

export const CurrencyMain: React.FC<{}> = () => (
  <Currency initial={InitialConfig} />
);
