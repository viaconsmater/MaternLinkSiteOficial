import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { TextField } from "@switchdreams/ui";
import React from "react";
import { NumericFormat } from "react-number-format";

import { currencyStringToInteger } from "@/utils";

const CurrencyInput = ({ value, setData, dataAttribute, ...props }) => {
  return (
    <NumericFormat
      customInput={TextField}
      decimalScale={2}
      decimalSeparator=","
      thousandSeparator="."
      fixedDecimalScale
      leftIcon={CurrencyDollarIcon}
      placeholder="00,00"
      value={value ? value / 100 : null}
      onChange={(e) => {
        setData(dataAttribute, currencyStringToInteger(e.target.value));
      }}
      {...props}
    />
  );
};

export default CurrencyInput;
