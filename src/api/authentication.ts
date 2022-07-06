import { AUTHENTICATION_URLS } from '../constants/api/urls';
import { IGoogleAuthentication } from '../interfaces/IGoogleAuthentication';
import { IRegister } from '../interfaces/IRegister';
import instance from './configurations/configuration';

export default class authenticationService {
  static register(model: IRegister) {
    return instance.post(AUTHENTICATION_URLS.REGISTRATION, model);
  }
  static authenticationByGoogle(model: IGoogleAuthentication) {
    return instance.post(AUTHENTICATION_URLS.GOOGLE_AUTH, model);
  }
}
