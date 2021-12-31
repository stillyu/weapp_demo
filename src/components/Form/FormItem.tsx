import React, { PureComponent, cloneElement } from "react";
import { View } from "@tarojs/components";
import { RuleItem } from "async-validator";
import FormContext from "./FormContext";
import styles from "./formItem.module.less";

export class FormItem extends PureComponent<{
  name: string | number | Array<string | number>;
  label: string;
  rules?: Array<RuleItem>;
  children: React.ReactElement;
}> {
  state = {
    helpText: "",
  };
  componentDidMount() {
    const { registerField } = this.context;
    registerField(this);
  }
  componentWillUnmount() {
    const { unregisterField } = this.context;
    unregisterField(this);
  }
  static contextType = FormContext;
  getInput() {
    const { children, name } = this.props;
    const { getFieldValue, setFieldValue } = this.context;
    return cloneElement(children, {
      value: getFieldValue(name),
      onChange: (v) => {
        if (children.props.onChange) {
          children.props.onChange(v);
        }
        setFieldValue(name, v);
      },
    });
  }
  updateHelpText(text?: string) {
    this.setState({ helpText: text });
  }
  render() {
    const { label } = this.props;
    const { helpText } = this.state;
    return (
      <View className={styles["form-item"]}>
        <View className={styles.label}>{label}</View>
        <View className={styles.input}>
          {this.getInput()}
          {!!helpText && (
            <View className={styles["help-text"]}>{helpText}</View>
          )}
        </View>
      </View>
    );
  }
}

export default FormItem;
