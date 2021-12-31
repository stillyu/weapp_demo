import { useCallback } from "react";
import { Input as TaroInput, View } from "@tarojs/components";
import classNames from "classnames";
import styles from "./index.module.less";

const Input: React.FC<{
  type?: "number" | "text" | "idcard" | "digit";
  password?: boolean;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (v: string) => void;
  value?: string;
  className?: string;
  addonAfter?: any;
}> = (props) => {
  const {
    type = "text",
    password,
    placeholder,
    disabled,
    maxLength = 140,
    onChange,
    value,
    addonAfter,
    className,
  } = props;
  const handleInput = useCallback(
    (e) => {
      let v = e.detail.value || "";
      onChange && onChange(v);
    },
    [onChange]
  );
  return (
    <View
      className={classNames(
        styles.inputWrapper,
        {
          [styles.disabled]: disabled,
        },
        className
      )}
    >
      <TaroInput
        value={value}
        className={classNames(styles.input)}
        type={type}
        password={password}
        disabled={disabled}
        maxlength={maxLength}
        onInput={handleInput}
      />
      {!value && placeholder && (
        <View
          className={classNames(styles.placeholder)}
        >
          {placeholder}
        </View>
      )}
      {addonAfter && <View className={styles.addonAfter}>{addonAfter}</View>}
    </View>
  );
};

export default Input;
