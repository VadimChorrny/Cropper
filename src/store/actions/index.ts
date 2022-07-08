import * as types from './types';

export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};

export const setAccess = (token: any) => {
  // maybe need change to type string
  return {
    type: types.SET_ACCESS,
    payload: token,
  };
};
