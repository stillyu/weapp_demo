import { PureComponent } from "react";
import FormContext from "./FormContext";

export class FormList extends PureComponent<{
  name: string;
  children: (
    fields: Array<{ name: Array<string | number>; index: number; value: any }>,
    operation: { add: () => void; remove: (i: number) => void }
  ) => React.ReactElement;
}> {
  componentDidMount() {
    const { registerList } = this.context;
    registerList(this);
  }
  componentWillUnmount() {
    const { unregisterList } = this.context;
    unregisterList(this);
  }
  static contextType = FormContext;
  add = () => {
    const { name } = this.props;
    const { setFieldValue, getFieldValue } = this.context;
    const value = getFieldValue(name) as Array<any>;
    setFieldValue(name, [...value, {}]);
  };
  remove = (i: number) => {
    const { name } = this.props;
    const { setFieldValue, getFieldValue } = this.context;
    const value = getFieldValue(name) as Array<any>;
    setFieldValue(
      name,
      value.filter((x, index) => index !== i)
    );
  };
  render() {
    const { name, children } = this.props;
    const { getFieldValue } = this.context;
    const value = (getFieldValue(name) || []) as Array<any>;
    return children(
      value.map((item, index) => {
        return { name: [name, index], index, value: item };
      }),
      { add: this.add, remove: this.remove }
    );
  }
}

export default FormList;
