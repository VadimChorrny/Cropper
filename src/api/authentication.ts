import { AUTHENTICATION_URLS } from '../constants/api/urls';
import { IGoogleAuthentication } from '../interfaces/IGoogleAuthentication';
import { ILogin } from '../interfaces/ILogin';
import { ILogout } from '../interfaces/ILogout';
import { IRegister } from '../interfaces/IRegister';
import instance from './configurations/configuration';

export default class authenticationService {
  static register(model: IRegister) {
    return instance.post(AUTHENTICATION_URLS.REGISTRATION, model);
  }

  static authenticationByGoogle(model: IGoogleAuthentication) {
    return instance.post(AUTHENTICATION_URLS.GOOGLE_AUTH, model);
  }

  static login(model: ILogin) {
    return instance.post(AUTHENTICATION_URLS.LOGIN, model);
  }

  static logout(model: ILogout) {
    return instance.post(AUTHENTICATION_URLS.LOGOUT, model);
  }

  // static refreshTokens(model: IRefreshToken) {
  //   return instance.post(AUTHENTICATION_URLS.REFRESH_TOKEN, model);
  // }
}
