import { User } from '../auth/user-model';
import * as AuthActions from '../Store/auth.actions'
export interface State {
    user: User,
    messageError: string,
    isLoading: boolean;
}

const initialState: State = {
    user: null,
    messageError: null,
    isLoading: null
}

export function authReducer(
    state: State = initialState
    , action: any) {

    switch (action.type) {
        case AuthActions.Authenticate_Success:
            const user = new User(
                action.payload.email,
                action.payload.id,
                action.payload._token,
                action.payload._tokenExpirationDate
            )
            return {
                ...state,
                user: user,
                messageError: null,
                isLoading: false
            };
        case AuthActions.LOGOUt:
            return {
                ...state,
                user: null,
                messageError: null,
                isLoading: false
            };
        case AuthActions.LOGIN_Start:
        case AuthActions.SignUp_Start:
            return {
                ...state,
                messageError: null,
                isLoading: true
            };

        case AuthActions.Authenticate_Failed:
            return {
                ...state,
                user: null,
                messageError: action.payload,
                isLoading: false
            };
       case AuthActions.Clear_Error:
           return {
               ...state,
               messageError:null
           }
        default:
            return state
    }
}