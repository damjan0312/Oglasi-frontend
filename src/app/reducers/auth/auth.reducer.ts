
import { User } from 'src/app/models/user';
import { AuthActions, AuthActionTypes } from 'src/app/actions/auth.actions';


export interface AuthState {
  loggedIn: boolean,
  user: User
}

export const initialState: AuthState = {
  loggedIn: false,
  user: undefined
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.user
      }
    case AuthActionTypes.SignupAction:
      return {
        loggedIn: false,
        user: undefined
      }
    case AuthActionTypes.LogoutAction:
      return {
        loggedIn: false,
        user: undefined
      }
    default:
      return state;
  }
}
