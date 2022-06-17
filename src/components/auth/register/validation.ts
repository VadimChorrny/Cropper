import * as yup from "yup";

const phoneRegExp = '^\+380-\d{3}-\d{2}-\d{2}$';

// @ts-ignore
export const RegisterSchema = yup.object({
   email: yup
       .string()
       .email("Вкажіть пошту")
       .required("Пошта є обов'язковою!"),
   firstName: yup
       .string()
       .required("Ім'я є обов'язковим!"),
   secondName: yup
       .string()
       .required("Фамілія є обов'язковою!"),
   password: yup.string().required('Уведіть пароль!'),
   passwordConfirmation: yup.string()
       .oneOf([yup.ref('password'), null], 'Паролі повинні співпадати!')
});