import * as types from '../actions/types';
import jwt from 'jwt-decode';
import { userRoles } from '../../constants/userRoles';
import tokenService from '../../services/token';

const intialState = {
  role: userRoles.GUEST,
  isAuthUser: false,
};

const authReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case types.SET_ACCESS: {
      const { accessToken, refreshToken } = action.payload;

      let decodedAccessToken: any = jwt(accessToken);
      let role: string = decodedAccessToken.role;

      //   if (userRoles.GUEST !== undefined) {
      tokenService.setLocalAccessToken(accessToken);
      tokenService.setLocalRefreshToken(refreshToken);

      return {
        ...state,
        role: role,
        isAuthUser: true,
      };
      //   }

      console.log('Error with login!');

      break;
    }

    case types.LOGOUT: {
      tokenService.deleteTokens();

      return {
        ...state,
        role: userRoles.GUEST,
        isAuthUser: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
