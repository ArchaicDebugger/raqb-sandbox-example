import React, { useState, useCallback, useEffect } from "react";
import { Query, Builder, Utils as QbUtils, BasicConfig } from "react-awesome-query-builder";
import jsonLogic from 'json-logic-js';

import "react-awesome-query-builder/lib/css/styles.css";
import "react-awesome-query-builder/lib/css/compact_styles.css"; //optional, for more compact styles
import TextWidget from "./widgets/TextWidget";
import WeirdWidget from "./widgets/CustomWidget";
import OperatorDropdown from "./layout/OperatorDropdown";

// You need to provide your own config. See below 'Config format'
const config = {
  ...BasicConfig,
  fields: {
    username: {
      label: 'Username',
      type: 'text'
    },
    color: {
      label: 'Color',
      type: 'text'
    },
    date1: {
      label: 'Date',
      type: 'date'
    },
    date2: {
      label: 'Date 2',
      type: 'date'
    },
    date3: {
      label: 'Date 3',
      type: 'date'
    }
  },
  widgets: {
    ...BasicConfig.widgets,
    text: {
      ...BasicConfig.widgets.text,
      factory: props => <TextWidget {...props} />
    },
    color: {
      ...BasicConfig.widgets.text,
      factory: props => <WeirdWidget {...props} />
    }
  },
  types: {
    ...BasicConfig.types,
    color: {
      ...BasicConfig.types.text,
      operators: ['equal'],
      widgets: {
        color: {
          ...BasicConfig.widgets.text,
          factory: props => <WeirdWidget {...props} />
        }
      }
    }
  },
  settings: {
    ...BasicConfig.settings,
    renderOperator: props => <OperatorDropdown {...props} />
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: "group" };

export const Demo = () => {
  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config
  });
  const [logic, setLogic] = useState();
  const [evalModel, setEvalModel] = useState('');
  const [parsedEvalModel, setParsedEvalModel] = useState();

  const onChange = useCallback((immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    //setState(prevState => { ...prevState, immutableTree, config });
    setState(prevState => ({ ...prevState, tree: immutableTree, config: config }));
    setLogic(QbUtils.jsonLogicFormat(immutableTree, config));
  }, []);

  const renderBuilder = useCallback((props) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  ), []);

  useEffect(() => {
    try {
      const parsed = JSON.parse(evalModel);
      setParsedEvalModel(parsed);
    } catch {

    }
  }, [evalModel]);

  return (
    <div>
      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <div className="query-builder-result">
        <div>
          Query string:{" "}
          <pre>
            {JSON.stringify(QbUtils.queryString(state.tree, state.config))}
          </pre>
        </div>
        <div>
          MongoDb query:{" "}
          <pre>
            {JSON.stringify(QbUtils.mongodbFormat(state.tree, state.config))}
          </pre>
        </div>
        <div>
          SQL where:{" "}
          <pre>
            {JSON.stringify(QbUtils.sqlFormat(state.tree, state.config))}
          </pre>
        </div>

        <div>
          TREE
          <pre>
            <textarea disabled value={JSON.stringify(state.tree)} />
          </pre>
        </div>

        <div>
          JsonLogic
          <pre>
            <textarea disabled value={JSON.stringify(QbUtils.jsonLogicFormat(state.tree, state.config))} />
          </pre>
        </div>

        <div>
          <pre>
            <textarea onChange={e => setEvalModel(e.target.value)} value={evalModel} />
          </pre>
        </div>

        <div>
          EVALUATION ({parsedEvalModel ? 'Parsed' : 'Not parsed'})
          <pre>
            {logic && logic.logic && parsedEvalModel ? JSON.stringify(jsonLogic.apply(logic.logic, parsedEvalModel)) : 'NOTHING TO EVAL'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Demo;