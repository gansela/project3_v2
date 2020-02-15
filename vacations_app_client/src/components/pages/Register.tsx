import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux"
import { saveToLocalStorage } from "../../utils/localStorage"
import useStateWithHandler from "../../hooks/useStateWithHandler"
import { registerAction } from "../../redux/actions"
import { IRegister, IRegisterState } from "../../ts/interfaces"



function Register(props: IRegister) {
    const { onSave } = props
    const initialState: IRegisterState = {
        userName: "",
        firstName: "",
        lastName: "",
        password: "",
    }

    const initialStateValidation: IRegisterState = {
        userName: "",
        firstName: "",
        lastName: "",
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
        if (data.userName.length < 2 || data.userName.length > 29) {
            checkrefrence.userName = "*length should be 2-30 charecters"
            isValideted = false
        } else checkrefrence.userName = ""
        if (data.firstName.length < 2 || data.firstName.length > 29) {
            checkrefrence.firstName = "*length should be 2-30 charecters"
            isValideted = false
        } else checkrefrence.firstName = ""
        if (data.lastName.length < 2 || data.lastName.length > 49) {
            checkrefrence.lastName = "*length should be 2-50 charecters"
            isValideted = false
        } else checkrefrence.lastName = ""
        if (data.password.length < 8 || data.password.length > 29) {
            checkrefrence.password = "*length should be 8-30 charecters"
            isValideted = false
        } else checkrefrence.password = ""
        setFields({ ...checkrefrence })
        return isValideted
    }

    useEffect(() => {
        const { redirect } = props
        if (redirect) props.history.push("login")
    }, [props.redirect])

    return (
        <div className="auth">

            <h3 >Register</h3>
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="userName" label={getFieldsErr("userName", "User Name", fieldsErrMessages)} type="userName" id="userName" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="firstName" label={getFieldsErr("firstName", "First Name",  fieldsErrMessages)} type="firstName" id="firstName" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="lastName" label={getFieldsErr("lastName", "Last Name",  fieldsErrMessages)} type="lastName" id="lastName" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="password" label={getFieldsErr("password", "Password", fieldsErrMessages)} type="password" id="password" onChange={handleChange} />
            <Button style={{ margin: "15px", verticalAlign: "top" }} onClick={handleRegister}>Register</Button>
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
    saveToLocalStorage("nw_app", state)
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        onSave: (userObj: IRegisterState) => {
            dispatch(registerAction(userObj))
        },
    }
}

export default connect(mapToProps, mapDispatch)(Register)