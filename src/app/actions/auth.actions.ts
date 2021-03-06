import { Action } from '@ngrx/store';
import { User } from '../models/user';


export enum AuthActionTypes {
 LoginAction = '[Login] Action',
 LogoutAction = '[Logout] Action',
 SignupAction = '[SignUp] Action'
  
}

export class Login implements Action {
  
  readonly type = AuthActionTypes.LoginAction;

  constructor (public payload: {user:User}){

  }
}

export class Signup implements Action {
  
  readonly type = AuthActionTypes.SignupAction;

  constructor (){

  }
}

export class Logout implements Action {
  
  readonly type = AuthActionTypes.LogoutAction;

}


export type AuthActions = Login  | Signup | Logout;

