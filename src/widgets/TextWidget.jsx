import React from 'react';

const TextWidget = props => {
  const {value, setValue, config, readonly, placeholder, maxLength, customProps, } = props;
  const onChange = e => {
    let val = e.target.value;
    if (val === "")
      val = undefined; // don't allow empty value
    setValue(val);
  };
  const textValue = value || "";
  return (
    <input
      type="text" 
      value={textValue} 
      placeholder={placeholder} 
      disabled={readonly} 
      onChange={onChange}
      maxLength={maxLength}
      {...customProps}
    />
  );
}

export default TextWidget;