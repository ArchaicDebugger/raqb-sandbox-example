import React, { useCallback } from "react";

const OperatorDropdown = props => {

  const operators = props.items;
  const { setField } = props;

  const onItemChanged = useCallback(e => {
    debugger;
    setField(e.target.value);
  }, []);

  return <select onChange={onItemChanged}>
    { operators.map(x => <option key={x.key} value={x.key}>{x.label}</option>) }
  </select>;
};

export default OperatorDropdown;