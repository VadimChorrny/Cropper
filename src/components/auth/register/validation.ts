import * as yup from 'yup';
// @ts-ignore
export const RegisterSchema = yup.object({
  avatar: yup.string().required('Оберіть фото!'),
  email: yup.string().email('Вкажіть пошту').required("Пошта є обов'язковою!"),
  name: yup.string().required("Ім'я є обов'язковим!"),
  surname: yup.string().required("Фамілія є обов'язковою!"),
  password: yup.string().required('Уведіть пароль!'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Паролі повинні співпадати!'),
});
