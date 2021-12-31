import { Form as TaroForm } from "@tarojs/components";
import FormContext from "./FormContext";
import useForm from "./useForm";

type FormInstance = ReturnType<typeof useForm>;

const Form: React.FC<{
  className?: string;
  form: FormInstance;
  initialValues?: any;
}> = (props) => {
  const { className, children, form } = props;
  return (
    <TaroForm className={className}>
      <FormContext.Provider value={form}>{children}</FormContext.Provider>
    </TaroForm>
  );
};

export default Form;
