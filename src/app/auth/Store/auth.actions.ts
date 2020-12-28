import { Action } from '@ngrx/store';


export const LOGIN_Start='[Auth] Login_Start';
export const Authenticate_Failed='[Auth] LOGIN_Failed';
export const Authenticate_Success='[Auth] Login_Success';
export const LOGOUt='Logout';
export const SignUp_Start='[Auth] SignUp_Start'
export const Clear_Error='[Auth] Clear_Error'
export const auto_Login="[Auth] Auto Login"
export class AuthenticateSuccess  implements Action{
    readonly type=Authenticate_Success;
    constructor(public payload:{
        email:string;
        id:string;
        _token:string;
        _tokenExpirationDate:Date,
        redirect:boolean
    }){}
} 

export class Logout  implements Action{
    readonly type=LOGOUt
}

export class LoginStart implements Action{
    readonly type=LOGIN_Start

    constructor(public payload:{email:string; password:string}){

    }
}

export class AuthenticateFailed implements Action{
    readonly type=Authenticate_Failed

    constructor(public payload:string){

    }
}

export class SignUpStart implements Action{
    readonly type=SignUp_Start

    constructor(public payload:{email:string , password:string}){

    }
}

export class ClearError implements Action{
   readonly type=Clear_Error
}

export class AutoLogin implements Action{
    readonly type=auto_Login
}