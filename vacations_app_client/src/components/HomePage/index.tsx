import React from 'react';
import { connect } from "react-redux"
import Button from '@material-ui/core/Button';
import { disableRidirect, getVacationsAction } from "../../redux/actions"
import { IHome, ICardList } from "../../ts/interfaces"
import CardList from "../cards/CardList"






class HomePage extends React.Component<IHome> {
    constructor(props: IHome) {
        super(props)

        this.state = {}
    }


    componentDidMount() {
        const { isRedirect, session, redirect, getVacations, history, } = this.props
        if (!session) history.push("/login")
        if (redirect) {
            isRedirect()
        }
    }




    render() {
        const { vacations, user, redirectLog, history  } = this.props
        const historyNav =  {history}
        if (redirectLog) history.push("/login")
        // if(!vacations.length) return (<div className="loader"></div>)
        return (
            <div className="home">
                <h4 className="big-headline"> Our Vacations</h4>
                <CardList {...historyNav} />
            </div>
        )
    }
}


const mapToProps = (state: any) => {
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        isRedirect: () => {
            dispatch(disableRidirect())
        },
        getVacations: () => {
            dispatch(getVacationsAction())
        }
    }
}

export default connect(mapToProps, mapDispatch)(HomePage)