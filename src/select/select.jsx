import React from "react";
import "./select.scss";

export const Select = (props) => {
  const { optionsList, id, onClick, label, defaultValue } = props;

  return (
    <div className="currency-select">
      <label htmlFor={id}>{label}</label>
      <select id={id} onClick={onClick}>
        {optionsList.map((country) => (
          <option
            key={country.abbr}
            value={country.abbr}
            {...(defaultValue === country.abbr && { selected: "selected" })}
          >
            {country.country}
          </option>
        ))}
      </select>
    </div>
  );
};
