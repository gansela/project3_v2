import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux"
import useStateWithHandler from "../../hooks/useStateWithHandler"
import { disableRidirect, logUserAction, disableRidirectLogin } from "../../redux/actions"
import { ILogIn, iLogInState } from "../../ts/interfaces"




function LogIn(props: ILogIn) {
    const { onSave, isRedirect, session, redirect, redirectLog, isRedirectLogin } = props
    const initialState: iLogInState = {
        userName: "",
        password: "",
    }

    const initialStateValidation: iLogInState = {
        userName: "",
        password: "",
    }
    const [data, handleChange] = useStateWithHandler(initialState)
    const [fieldsErrMessages, setFields] = useState(initialStateValidation)


    const handleRegister = () => {
        const checked = checkFields()
        if (checked) onSave(data)
    }

    const checkFields = () => {
        const checkrefrence = { ...fieldsErrMessages }
        let isValideted = true
        if (data.userName.length === 0) {
            checkrefrence.userName = "*Requierd field"
            isValideted = false
        } else checkrefrence.userName = ""
        if (data.password.length === 0) {
            checkrefrence.password = "*Requierd field"
            isValideted = false
        } else checkrefrence.password = ""
        setFields({ ...checkrefrence })
        return isValideted
    }

    useEffect(() => {
        if (redirectLog) isRedirectLogin()
    }, [redirectLog])
    useEffect(() => {
        if (redirect && !session) isRedirect()
    }, [])
    if (redirect && session) props.history.push("/home")
    else if (redirect && !session) {
        return (<div className="loader"></div>)
    }
    return (
        <div className="auth">
            <h3 >Log In</ h3>

            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="userName" label={getFieldsErr("userName", "User Name", fieldsErrMessages)} type="userName" id="userName" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="password" label={getFieldsErr("password", "Password", fieldsErrMessages)} type="password" id="password" onChange={handleChange} />
            <Button style={{ margin: "5px", verticalAlign: "top" }} onClick={handleRegister}>Log In</Button>
            <Link to="/changepassword" style={{ marginTop: "10px" }}><Button style={{ margin: "5px", verticalAlign: "top" }} >Change Password</Button></Link>
            <Link to="/register" style={{ marginTop: "10px" }}><Button style={{ margin: "5px", verticalAlign: "top" }} >Register</Button></Link>
            
        </div>
    )

}

const getFieldsErr = (name: string, label: string ,fieldsErrMessages: any) => {
    const span = fieldsErrMessages[name]
    return (
        <span>{label}<span style={{ "color": "red" }}> {span}</span></span>
    )
}


const mapToProps = (state: any) => {
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        onSave: (userObj: iLogInState) => {
            dispatch(logUserAction(userObj))
        },
        isRedirect: () => {
            dispatch(disableRidirect())
        },
        isRedirectLogin: () => {
            dispatch(disableRidirectLogin())
        }
    }
}

export default connect(mapToProps, mapDispatch)(LogIn)