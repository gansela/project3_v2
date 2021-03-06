export interface IAction {
    type: string;
    payload: any;

}

export interface IState {
    user: string,
    redirect: boolean,
    session: string,
    role: string,
    vacations: Array<IVacation>,
    redirectLog: boolean,
    selectedVacation: IVacation | null,
    alertMessage: string
}

export interface IVacation {
    id: number,
    description: string,
    destination: string
    start_date: string,
    end_date: string,
    image: string,
    price: number,
    follows: number,
    time_of_like?: number,

}


export interface ILogIn {
    redirect: boolean,
    onSave: any,
    session: string,
    isRedirect: any,
    isRedirectLogin: any,
    history: any,
    redirectLog: boolean
}

export interface ICardList {
    vacations: Array<IVacation>
    getVacations: any,
    role: string,
    postLike: any,
    unLike: any,
    user: string,
    deleteVacation: any,
    history: any,
    selectVacation: any,
    session: string
}

export interface iLogInState {
    userName: string
    password: string
}

export interface IRegister {
    onSave: any,
    history: any,
    redirect: boolean
}

export interface IRegisterState {
    userName: string
    firstName: string
    lastName: string
    password: string
}
export interface IChangePasswordState {
    userName: string
    password: string
    newPassword: string
    confirmPassword: string
}

export interface IChangePassword {
    onSave: any,
    redirect: boolean,
    history: any
}

export interface IHome {
    redirect: boolean,
    session: string,
    isRedirect: any,
    history: any,
    vacations: Array<IVacation>,
    getVacations: any,
    user: string,
    redirectLog: boolean
}

export interface IAppLinks {
    role: string
}

export interface ILike {
    user: string,
    vacation_id: number
}

export interface IUserCard {
    vacation: IVacation,
    userFunctions: IUserFunctions
}

export interface IAdminCard {
    vacation: IVacation,
    adminFunctions: IAdminFunctions,
}

export interface IUserFunctions {
    postLike: any,
    unLike: any,
    user: string
}

export interface IAdminFunctions {
    deleteVacation: any,
    selectVacation: any,
    history: any,
    session: string
}

export interface ICreateVacation {
    history: any,
    selectedVacation: IVacation,
    addVacation: any,
    clearVacation: any,
    editVacation: any,
    state: IState,
    session: string
}

export interface ICheckVacation {
    description: string,
    destination: string,
    start_date: string,
    end_date: string,
    image: string,
    price: string,
}


export interface IStateProps {
    state: IState,
    history: any
}

export interface IReportsState {
    vacations: Array<IVacation>,
    history: any,
    session: string
}

export interface IAlertModel {
    alertMessage: string,
    clearMessage: any,
}