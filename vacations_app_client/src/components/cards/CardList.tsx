import React, { useEffect, useState } from 'react';
import { ICardList, IUserCard, ILike, IVacation } from "../../ts/interfaces"
import { connect } from "react-redux"
import { getVacationsAction, postLikeAction, unLikeAction, deleteVacationAction, selectVacationAction } from "../../redux/actions"
import AdminCard from "./AdminCard"
import UserCard from "./UserCard"

import Fab from '@material-ui/core/Fab';




const CardList: React.FunctionComponent<any> = (props: ICardList) => {
    const { getVacations, vacations, role, postLike, user, unLike, deleteVacation, selectVacation, history } = props
    const initialState = { isCreateCard: false }
    const [data, setData] = useState(initialState)

    useEffect(() => {
        getVacations()
    }, [])

    useEffect(() => {
        if (data.isCreateCard) props.history.push("/createoredit")
    }, [data.isCreateCard])


    if (!vacations.length || (role !== "admin" && role !== "user")) {
        return (<div className="loader"></div>)
    }
    const sortedVacations = sortVacations(vacations, role)
    const userFunctions = { postLike, user, unLike }
    const adminFunctions = { deleteVacation, selectVacation, history }
    const TypeOfCard: React.FunctionComponent<any> = role === "admin" ? AdminCard : UserCard
    return (
        <div>
            <AddVacationButton role={role} setData={setData} />
            <div className="row">
                {sortedVacations.map((vacation: IVacation) => <div className="col-12 col-md-6"> <TypeOfCard vacation={vacation} userFunctions={userFunctions} adminFunctions={adminFunctions} /> </div>)}
            </div>
        </div>

    )
}

const sortVacations = (vacations: Array<IVacation>, role: string): any => {
    const mapedArr: Array<IVacation> = vacations.map(vacation => {
        const result: IVacation = vacation.time_of_like === null ? { ...vacation, time_of_like: 0 } : { ...vacation }
        return result
    })
    const sortedArr: Array<IVacation> = role === "user" ? mapedArr.sort((a, b) => ((a.time_of_like || 0) < (b.time_of_like || 0)) ? 1 : -1) : vacations
    return sortedArr
}

const AddVacationButton = (props: { role: string, setData: any }) => {
    const { role, setData } = props
    console.log(role)
    if (role !== "admin" || !role) return (<></>)
    return (
        <div >
            <Fab color="primary" aria-label="add" className="fav-button" onClick={() => setData({ isCreateCard: true })}>Add Vacation</Fab>
        </div>
    )
}



const mapToProps = (state: any) => {
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        getVacations: () => {
            dispatch(getVacationsAction())
        },
        postLike: (likeDetailes: ILike) => {
            dispatch(postLikeAction(likeDetailes))
        },
        unLike: (likeDetailes: ILike) => {
            dispatch(unLikeAction(likeDetailes))
        },
        deleteVacation: (vacation_id: number) => {
            dispatch(deleteVacationAction(vacation_id))
        },
        selectVacation: (vacation: IVacation) => {
            dispatch(selectVacationAction(vacation))
           
        }
    }
}

export default connect(mapToProps, mapDispatch)(CardList)