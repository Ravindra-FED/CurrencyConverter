import React from "react";
import "./input.scss";

export const Input = (props) => {
  const { id, onChange, placeholder, value } = props;
  
  const onInputChange = (e) => {
    var numbers = /^[0-9]{0,}$/;
    if(e.target.value?.trim().match(numbers) !== null){
      onChange(e)
    }
  };

  return (
    <div className="currency-input">
      <input
        onInput={onInputChange}
        id={id}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
