import { useRef } from "react";
import { set, unset, get, has, flatten } from "lodash";
import Schema from "async-validator";
import { FormItem } from "./FormItem";
import { FormList } from "./FormList";
import message from "./utils/defaultMessage";
import { chineseNameRule } from "./utils/customerRules";

Schema.register(chineseNameRule.type, chineseNameRule.validator);

const useForm = () => {
  const ref = useRef(new FormStore().getForm());
  return ref.current;
};

export default useForm;

class FormStore {
  store = {};
  fields: Array<FormItem> = [];
  listFields: Array<FormList> = [];
  registerField = (formItem: FormItem) => {
    this.fields.push(formItem);
    const {
      props: { name },
    } = formItem;
    set(this.store, name, "");
  };
  registerList = (formList: FormList) => {
    this.listFields.push(formList);
    const {
      props: { name },
    } = formList;
    set(this.store, name, [{}]);
    formList.forceUpdate();
  };
  unregisterField = (formItem: FormItem) => {
    const {
      props: { name },
    } = formItem;
    this.fields = this.fields.filter((x) => x !== formItem);
    unset(this.store, name);
  };
  unregisterList = (formList: FormList) => {
    const {
      props: { name },
    } = formList;
    this.listFields = this.listFields.filter((x) => x !== formList);
    unset(this.store, name);
  };
  getFieldValue = (name: string | number | Array<string | number>) => {
    return get(this.store, name);
  };
  getFieldsValue = () => {
    return this.store;
  };
  setFieldValue = (
    name: string | number | Array<string | number>,
    value: any
  ) => {
    if (has(this.store, name)) {
      set(this.store, name, value);
      const fields = this.fields.filter(
        (x) =>
          x.props.name === name ||
          (Array.isArray(x.props.name) && x.props.name[0] === name)
      );
      fields.forEach((field) => {
        field.forceUpdate();
        this.validateField(field).catch((err) => {
          console.warn("validate err", err);
        });
      });
      const listField = this.listFields.find((x) => x.props.name === name);
      if (listField) {
        listField.forceUpdate();
      }
    }
  };
  setFieldsValue = (newStore: object) => {
    Object.keys(newStore).forEach((key) => {
      const item = newStore[key];
      if (has(this.store, key)) {
        this.setFieldValue(key, item);
      }
    });
  };
  validateFields = () => {
    return new Promise((resolve, reject) => {
      Promise.allSettled(
        this.fields.map((item) => this.validateField(item))
      ).then((results) => {
        const rejectRes: PromiseRejectedResult[] = [];
        results.forEach((item) => {
          if (item.status === "rejected") {
            rejectRes.push(item);
          }
        });
        if (rejectRes.length > 0) {
          reject({
            errors: flatten(rejectRes.map((item) => item.reason)),
            values: this.getFieldsValue(),
          });
        } else {
          resolve(this.getFieldsValue());
        }
      });
    });
  };
  validateField = (field: FormItem): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const {
        props: { rules, name },
      } = field;
      if (rules && rules.length > 0) {
        const value = this.getFieldValue(name);
        const validator = new Schema({
          value: rules,
        });
        validator.messages(message(field));
        validator.validate(
          { value },
          { suppressWarning: true },
          (errors) => {
            if (errors) {
              field.updateHelpText(errors[0].message);
              reject(errors);
            } else {
              field.updateHelpText();
              resolve(true);
            }
          }
        );
      } else {
        resolve(true);
      }
    });
  };
  getForm = () => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    registerField: this.registerField,
    unregisterField: this.unregisterField,
    validateFields: this.validateFields,
    setFieldValue: this.setFieldValue,
    registerList: this.registerList,
    unregisterList: this.unregisterList,
  });
}
