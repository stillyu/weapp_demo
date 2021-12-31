import Form from "./Form";
import FormItem from "./FormItem";
import FormList from "./FormList";
import useForm from "./useForm";

type InternalForm = typeof Form;

interface IForm extends InternalForm {
  Item: typeof FormItem;
  useForm: typeof useForm;
  List: typeof FormList
}

const RefForm: IForm = Form as IForm;
RefForm.Item = FormItem;
RefForm.useForm = useForm;
RefForm.List = FormList;

export default RefForm;
