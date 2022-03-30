import { BasicConfig } from "react-awesome-query-builder"
import TextWidget from "../widgets/TextWidget";

const Config = {
  ...BasicConfig,
  fields: {
    username: {
      label: 'Username',
      type: 'text'
    }
  },
  widgets: {
    ...BasicConfig.widgets,
    text: {
      ...BasicConfig.widgets.text,
      factory: props => <TextWidget {...props} />
    }
  }
}

console.log(Config);

export default Config;