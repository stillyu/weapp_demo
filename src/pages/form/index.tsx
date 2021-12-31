import { useCallback } from "react";
import { View, Button } from "@tarojs/components";
import Form from "@components/Form";
import Input from "@components/Input";
import Radio from "@components/Radio";
import "./index.less";

const { Item, useForm, List } = Form;

export default () => {
  const form = useForm();
  const handleValidate = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        console.log("values", values);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  const handleSetFieldsValue = useCallback(() => {
    form.setFieldsValue({
      name: "王小二",
      sex: 2,
      profile: {
        weight: 50,
        height: 180,
      },
      list: [
        {
          name: "1111",
        },
        {
          name: "22222",
        },
      ],
    });
  }, []);
  return (
    <View className="form">
      <Form form={form}>
        <View className="title">基本用法</View>
        <Item
          name="name"
          label="姓名"
          rules={[{ type: "chineseName", min: 10 }]}
        >
          <Input />
        </Item>
        <Item name="sex" label="性别" rules={[{ required: true }]}>
          <Radio
            range={[
              { title: "男", code: 1 },
              { title: "女", code: 2 },
            ]}
            displayKey="title"
            valueKey="code"
          />
        </Item>
        <View className="title">name嵌套</View>
        <Item name={["profile", "height"]} label="身高">
          <Input />
        </Item>
        <Item name={["profile", "weight"]} label="体重">
          <Input />
        </Item>

        <List name="list">
          {(fields, { add, remove }) => {
            return (
              <>
                <View className="title">
                  FormList
                  <View onClick={add} className="list-btn">
                    添加一项
                  </View>
                </View>
                <View className="list">
                  {fields.map((field) => {
                    return (
                      <Item
                        name={[...field.name, "name"]}
                        label={`名称${field.index + 1}`}
                        key={field.index}
                      >
                        <Input
                          addonAfter={
                            <Button
                              onClick={() => {
                                remove(field.index);
                              }}
                            >
                              删除该项
                            </Button>
                          }
                        />
                      </Item>
                    );
                  })}
                </View>
              </>
            );
          }}
        </List>
      </Form>
      <Button className="btn" onClick={handleValidate}>
        validateFieldsValue
      </Button>
      <Button className="btn" onClick={handleSetFieldsValue}>
        setFieldsValue
      </Button>
    </View>
  );
};
