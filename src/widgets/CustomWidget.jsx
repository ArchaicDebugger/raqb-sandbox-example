import React from 'react';
import { SketchPicker } from 'react-color';

const WeirdWidget = props => {
  const {value, setValue, config } = props;

  const onColorChanged = e => {
    debugger;
  }

  return <div>
    <SketchPicker onChange={onColorChanged} />
  </div>
}

export default WeirdWidget;