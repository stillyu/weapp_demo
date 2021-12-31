import { createContext } from "react";
import useForm from "./useForm";

type FormInstance = ReturnType<typeof useForm>;
// @ts-expect-error
const initialContext: FormInstance = {};

const FormContext = createContext<FormInstance>(initialContext);

export default FormContext;
