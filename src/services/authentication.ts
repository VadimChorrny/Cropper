import authenticationService from '../api/authentication';
import { IRegister } from '../interfaces/IRegister';

export default function register(values: IRegister) {
  const initialValues: IRegister = {
    name: values.name,
    surname: values.surname,
    email: values.email,
    avatar: values.avatar,
    password: values.password,
  };
  authenticationService
    .register(initialValues)
    .then(() => {
      console.log('Successfully registered!');
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
}
