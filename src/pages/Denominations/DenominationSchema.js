import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup
    .string()
    .required('ID is required'),
  name: yup
    .string()
    .required('Last Name is required'),
  value: yup
    .number()
    .required("Number is required")
    .typeError("It must be a number")
    .positive(),
});

export default schema;