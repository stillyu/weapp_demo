import { View } from "@tarojs/components";
import classNames from "classnames";
import { useCallback } from "react";
import styles from "./index.module.less";

const Radio: React.FC<{
  className?: string;
  value?: string;
  onChange?: (v: string) => void;
  range: Array<any>;
  displayKey: string;
  disabled?: boolean;
  valueKey: string;
  itemClassName?: string;
}> = (props) => {
  const {
    className,
    value,
    onChange,
    range = [],
    displayKey,
    disabled = false,
    valueKey = "id",
    itemClassName,
  } = props;

  return (
    <View
      className={classNames(
        styles.radio,
        { [styles.disabled]: disabled },
        className
      )}
    >
      {range.map((item, index) => (
        <RadioItem
          className={itemClassName}
          key={index}
          checked={item[valueKey] === value}
          title={item[displayKey]}
          onClick={() => {
            onChange && onChange(item[valueKey]);
          }}
          disabled={disabled}
        />
      ))}
    </View>
  );
};

export default Radio;

const RadioItem: React.FC<{
  title: string;
  checked: boolean;
  onClick: () => void;
  className?: string;
  disabled: boolean;
}> = (props) => {
  const { checked, title, onClick, className, disabled } = props;
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick();
    }
  }, [onClick, disabled]);
  return (
    <View
      className={classNames(
        styles.radioItem,
        { [styles.checked]: checked },
        className
      )}
      onClick={handleClick}
    >
      {title}
    </View>
  );
};
