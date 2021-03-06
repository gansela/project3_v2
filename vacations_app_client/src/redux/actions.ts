import Actions from "./actions.config";
import { IRegisterState, iLogInState, IChangePasswordState, IVacation, ILike } from "../ts/interfaces"
import {
    registerService,
    logInService,
    cahngePasswordService,
    getVacationsService,
    postLikeService,
    unLikeService,
    deleteVacationService,
    addVacationService,
    editVacationService
} from "./service";



export const registerAction = (user: IRegisterState) => {
    return async (dispachFn: any) => {
        const response: any = await registerService(user);
        if (response.error) dispachFn(updateAlertMessage(response.message));
        else {
            dispachFn(updateAlertMessage(response.message));
            dispachFn(registerSuccess(response.redirect));
        }
    };
};

export const registerSuccess = (redirect: boolean) => {
    return {
        type: Actions.SAVE_USER_SUCCESS,
        payload: { redirect }
    };
};

export const logUserAction = (logUser: iLogInState) => {
    return async (dispachFn: any) => {
        const response: any = await logInService(logUser);
        if (!response.redirect) dispachFn(updateAlertMessage(response.message));
        else {
            dispachFn(updateAlertMessage(response.message));
            dispachFn(logUserSuccess(response.redirect, response.key, response.details, response.role));
        }
    };
};

export const logUserSuccess = (redirect: boolean, session: string, user: any, role: string) => {
    return {
        type: Actions.LOGIN_USER_SUCCESS,
        payload: { redirect, session, user, role }
    };
};

export const disableRidirect = () => {
    return {
        type: Actions.DISABLE_REDIRECT
    };
};

export const changePasswordAction = (user: IChangePasswordState) => {
    return async (dispachFn: any) => {
        const response: any = await cahngePasswordService(user);
        if (response.error) dispachFn(updateAlertMessage(response.message));
        else {
            dispachFn(updateAlertMessage(response.message));
            dispachFn(stopSession());
            dispachFn(changePasswordSuccess(response.redirect));
        }
    };
};

export const changePasswordSuccess = (redirect: boolean) => {
    return {
        type: Actions.SAVE_USER_SUCCESS,
        payload: { redirect }
    };
};
export const disableRidirectLogin = () => {
    return {
        type: Actions.DISABLE_REDIRECT_LOGIN
    };
};

export const stopSession = () => {
    return {
        type: Actions.STOP_SESSION
    };
};

export const updateAlertMessage = (message: string) => {
    return {
        type: Actions.UPDATE_ALERT_MESSAGE,
        payload: { message }
    };
};


export const getVacationsAction = () => {
    return async (dispachFn: any) => {
        const response: any = await getVacationsService();
        if (response.errMessage) {
            dispachFn(updateAlertMessage(response.errMessage));
            if (response.redirectLog) {
                dispachFn(redirectLogAction(response.redirectLog));
                dispachFn(stopSession());
            }
        }
        else {
            dispachFn(getVacationsSucsess(response));
        }
    };
};

export const redirectLogAction = (redirectLog: boolean) => {
    return {
        type: Actions.REDIRECT_TO_LOGIN,
        payload: { redirectLog }
    };
}

export const getVacationsSucsess = (vacationsArr: Array<IVacation>) => {
    return {
        type: Actions.GET_VACATIONS_SUCCESS,
        payload: { vacationsArr }
    };
};

export const postLikeAction = (likeDetailes: ILike) => {
    return async (dispachFn: any) => {
        const response: any = await postLikeService(likeDetailes);
        if (response.errMessage) {
            dispachFn(updateAlertMessage(response.errMessage));
            if (response.redirectLog) {
                dispachFn(redirectLogAction(response.redirectLog));
                dispachFn(stopSession());
            }
        }
        else {
            dispachFn(getVacationsSucsess(response));
        }
    };
};

export const unLikeAction = (likeDetailes: ILike) => {
    return async (dispachFn: any) => {
        const response: any = await unLikeService(likeDetailes);
        if (response.errMessage) {
            dispachFn(updateAlertMessage(response.errMessage));
            if (response.redirectLog) {
                dispachFn(redirectLogAction(response.redirectLog));
                dispachFn(stopSession());
            }
        }
        else {
            dispachFn(getVacationsSucsess(response));
        }
    };
};

export const deleteVacationAction = (vacation_id: number) => {
    return async (dispachFn: any) => {
        const response: any = await deleteVacationService(vacation_id);
        if (response.errMessage) {
            dispachFn(updateAlertMessage(response.errMessage));
            if (response.redirectLog) {
                dispachFn(redirectLogAction(response.redirectLog));
                dispachFn(stopSession());
            }
        }
        else {
            dispachFn(getVacationsSucsess(response));
        }
    };
};

export const addVacationAction = (vacation: IVacation) => {
    return async (dispachFn: any) => {
        const response: any = await addVacationService(vacation);
        if (response.errMessage) {
            dispachFn(updateAlertMessage(response.errMessage));
            if (response.redirectLog) {
                dispachFn(redirectLogAction(response.redirectLog));
                dispachFn(stopSession());
            }
        }
        else {
            dispachFn(getVacationsSucsess(response));
        }
    };
};

export const selectVacationAction = (vacation: IVacation) => {
    return {
        type: Actions.SAVE_SELECTED_VACATION,
        payload: { vacation }
    };
}

export const clearVacationAction = () => {
    return {
        type: Actions.CLEAR_SELECTED_VACATION,
    };
}

export const editVacationAction = (vacation: IVacation) => {
    return async (dispachFn: any) => {
        const response: any = await editVacationService(vacation);
        if (response.errMessage) {
            dispachFn(updateAlertMessage(response.errMessage));
            if (response.redirectLog) {
                dispachFn(redirectLogAction(response.redirectLog));
                dispachFn(stopSession());
            }
        }
        else {
            dispachFn(getVacationsSucsess(response));
        }
    };
};