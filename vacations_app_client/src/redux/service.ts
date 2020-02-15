import mainAxios from "../axios/mainAxios";
import { IRegisterState, IChangePasswordState, iLogInState, ILike, IVacation } from "../ts/interfaces"




export const registerService = async (user: IRegisterState) => {
    try {
        const { data } = await mainAxios.post("/auth/register", user);
        return data;
    } catch (ex) {
        return {message: "somthing went wrong"}
    }
}

export const logInService = async (logInUser: iLogInState) => {
    try {
        const { data } = await mainAxios.post("/auth/login", logInUser);
        return data;
    } catch (ex) {
        return {message: "somthing went wrong"}
    }
}

export const cahngePasswordService = async (user: IChangePasswordState) => {
    try {
        const { data } = await mainAxios.post("/auth/changepassword", user);
        return data;
    } catch (ex) {

        return {message: "somthing went wrong"}

    }

}

export const getVacationsService = async () => {
    try {
        const { data } = await mainAxios.get(`/vacations/all`)
        return data;
    } catch (ex) {
        return {errMessage: "somthing doesn't work", redirectLog:true}
    }
}

export const postLikeService = async (likeDetailes : ILike) => {
    try {
        const { data } = await mainAxios.post("/vacations/likes/add", likeDetailes);
        return data;
    } catch (ex) {
        return {errMessage: "somthing doesn't work"}
    }
}

export const unLikeService = async (likeDetailes : ILike) => {
    try {
        const { data } = await mainAxios.post("/vacations/likes/undo",  likeDetailes);
        return data;
    } catch (ex) {
        return {errMessage: "somthing doesn't work"}
    }
}

export const deleteVacationService = async (vacation_id : number) => {
    try {
        const { data } = await mainAxios.delete("/vacations/admin/delete", { data: {vacation_id}});
        return data
    } catch (ex) {
        return {errMessage: "somthing doesn't work"}
    }
}

export const addVacationService = async (vacation : IVacation) => {
    try {
        const { data } = await mainAxios.post("/vacations/admin/add", vacation);
        return data
    } catch (ex) {
        return {errMessage: "somthing doesn't work"}
    }
}

export const editVacationService = async (vacation : IVacation) => {
    try {
        const { data } = await mainAxios.post("/vacations/admin/edit", vacation);
        return data
    } catch (ex) {
        return {errMessage: "somthing doesn't work"}
    }
}