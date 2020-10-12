import React from "react";
import { Currency } from "../containers/Currency/Currency";
import { InitialConfig } from "../data";
import { withAuth } from "../utils/withAuth";
import { User } from "../containers/Auth/User";

export const CurrencyScreen: React.FC<{}> = withAuth(() => (
  <>
    <User />
    <Currency initial={InitialConfig} />
  </>
));
