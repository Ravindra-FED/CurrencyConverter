import React from "react";
import { Input } from "../input/input";
import { Select } from "../select/select";
import "./currencySelectAndInput.scss";

export const CurrencySelectAndInput = (props) => {
  const {
    countriesAndSymbols,
    countryId,
    onSelectClick,
    selectDefaultValue,
    onChangeInput,
    currencyId,
    toAmount,
  } = props;

  return (
    <div className="currency-to-wrapper select-and-input">
      <Select
        optionsList={countriesAndSymbols}
        id={countryId}
        onClick={onSelectClick}
        label="To"
        defaultValue={selectDefaultValue}
      />
      <Input onChange={onChangeInput} id={currencyId} value={toAmount} />
    </div>
  );
};
