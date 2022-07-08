import authenticationService from '../api/authentication';
import { statusCode } from '../constants/statusCodes';
import { userRoles } from '../constants/userRoles';
import { ILogin } from '../interfaces/ILogin';
import { ILogout } from '../interfaces/ILogout';
import { IRegister } from '../interfaces/IRegister';
import { store } from '../store';
import { logout, setAccess } from '../store/actions';
import tokenService from './token';

export default function register(values: IRegister, recaptchaToken: string) {
  const initialValues: IRegister = {
    recaptchaToken: recaptchaToken,
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
      return true;
    })
    .catch((error) => {
      console.log('Error: ', error);
      return false;
    });
}

export function login(values: ILogin) {
  let model = {
    email: values.email,
    password: values.password,
  };

  authenticationService
    .login(model)
    .then(
      (response) => {
        store.dispatch(setAccess(response.data));
      },
      (err) => {
        err.response.status === statusCode.BAD_REQUEST
          ? console.error('User alredy exists')
          : console.error('Something пішло по пізді....');
      },
    )
    .catch(() => {
      console.error('Something пішло по пізді....');
    });
}

export function logoutUser() {
  const initialValues: ILogout = {
    refreshToken: tokenService.getLocalRefreshToken() as string,
  };

  authenticationService
    .logout(initialValues)
    .then(
      () => {
        store.dispatch(logout());
      },
      () => {
        console.error('Error, something пішло по пізді...');
      },
    )
    .catch(() => {
      console.error('Error, something пішло по пізді в catch()...');
    });
}
