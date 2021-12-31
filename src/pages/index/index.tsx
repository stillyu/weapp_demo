import { View, Button } from "@tarojs/components";
import { navigateTo } from "@tarojs/taro";
import { useCallback } from "react";
import "./index.less";

export default () => {
  const jump = useCallback((url) => {
    navigateTo({ url });
  }, []);
  return (
    <View className="index">
      <Button
        className="btn"
        onClick={() => {
          jump("/pages/form/index");
        }}
      >
        Form
      </Button>
    </View>
  );
};
