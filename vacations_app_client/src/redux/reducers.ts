import Actions from "./actions.config"
import  { IAction, IState, IVacation  } from "../ts/interfaces"




const initialState: IState = {
    user: "",
    redirect: false,
    session: "",
    role: "guest",
    vacations: [],
    redirectLog: false,
    selectedVacation: null
}


export default function root(state = initialState, action: IAction) {
    switch (action.type) {
        case Actions.SAVE_USER_SUCCESS: {
            return {
                ...state,
                redirect: action.payload.redirect
            }
        }
        case Actions.DISABLE_REDIRECT: {
            return {
                ...state,
                redirect: false
            }
        }
        case Actions.DISABLE_REDIRECT_LOGIN: {
            return {
                ...state,
                redirectLog: false
            }
        }
        case Actions.STOP_SESSION: {
            return {
                ...state,
                session: "",
                vacations: [],
                user: "",
                role: "guest"
            }
        }
        case Actions.LOGIN_USER_SUCCESS: {
            return {
                ...state,
                redirect: action.payload.redirect,
                session: action.payload.session,
                user: action.payload.user,
                role: action.payload.role
            }
        }
        case Actions.CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                redirect: action.payload.redirect
            }
        }
        case Actions.REDIRECT_TO_LOGIN: {
            return {
                ...state,
                redirectLog: action.payload.redirectLog
            }
        }
        case Actions.GET_VACATIONS_SUCCESS: {
            const { vacationsArr } = action.payload
            return {
                ...state,
                vacations: vacationsArr
            }
        }
        case Actions.SAVE_SELECTED_VACATION: {
            const { vacation } = action.payload
            return {
                ...state,
                selectedVacation: vacation
            }
        }
        case Actions.CLEAR_SELECTED_VACATION: {
            return {
                ...state,
                selectedVacation: null
            }
        }
        default: {
            return state
        }
    }

}