import { AUTHENTICATION_URLS } from '../constants/api/urls';
import { IRegister } from '../interfaces/IRegister';
import instance from './configurations/configuration';

export default class authenticationService {
  static register(model: IRegister) {
    return instance.post(AUTHENTICATION_URLS.REGISTRATION, model);
  }
}
