import axios from 'axios';
import { AUTHENTICATION_URLS, SERVER_URL } from '../../constants/api/urls';
import { statusCode } from '../../constants/statusCodes';
import tokenService from '../../services/token';
import { store } from '../../store';
import { logout } from '../../store/actions';
import authenticationService from '../../services/authentication';
import { AUTHORIZATION_TYPE } from '../../constants/api/others';

const instance = axios.create({
  baseURL: SERVER_URL,
});

instance.interceptors.request.use(
  (configuration) => {
    var accessToken = tokenService.getLocalAccessToken();

    if (accessToken) {
      configuration.headers.Authorization = `${AUTHORIZATION_TYPE} ${accessToken}`;
    }

    return configuration;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === statusCode.UNAUTHORIZED) {
      try {
        let accessToken = tokenService.getLocalAccessToken();
        let refreshToken = tokenService.getLocalRefreshToken();

        let model = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        let result = await authenticationService.refreshTokens(model);

        let newAccessToken = result.data.accessToken;
        let newRefreshToken = result.data.refreshToken;

        tokenService.setLocalAccessToken(newAccessToken);
        tokenService.setLocalRefreshToken(newRefreshToken);

        return instance(error.config);
      } catch (internalError) {
        return Promise.reject(internalError);
      }
    }

    if (
      (error.response.status === statusCode.NOT_FOUND ||
        error.response.status === statusCode.INTERNAL_SERVER_ERROR) &&
      error.config.url == AUTHENTICATION_URLS.REFRESH_TOKEN
    ) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);

export default instance;
