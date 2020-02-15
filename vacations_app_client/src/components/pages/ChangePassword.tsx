import React, {  useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { changePasswordAction } from "../../redux/actions"
import { connect } from "react-redux"
import useStateWithHandler from "../../hooks/useStateWithHandler"
import { IChangePasswordState, IChangePassword } from "../../ts/interfaces"


function ChangePassword(props: IChangePassword) {
    const { onSave, redirect } = props
    const initialState: IChangePasswordState = {
        userName: "",
        password: "",
        newPassword: "",
        confirmPassword: ""
    }

    const initialStateValidation: IChangePasswordState = {
        userName: "",
        password: "",
        newPassword: "",
        confirmPassword: ""
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
            checkrefrence.userName = "*this field is required"
            isValideted = false
        } else checkrefrence.userName = ""
        if (data.newPassword.length < 8 || data.newPassword.length > 29) {
            checkrefrence.newPassword = "*length should be 8-30 charecters"
            isValideted = false
        } else checkrefrence.newPassword = ""
        if (data.password.length < 8 || data.password.length > 29) {
            checkrefrence.password = "*invalid password"
            isValideted = false
        } else checkrefrence.password = ""
        if (data.newPassword.length !== data. confirmPassword.length ) {
            checkrefrence.confirmPassword = "*please confirm new password"
            isValideted = false
        } else checkrefrence.confirmPassword = ""
        setFields({ ...checkrefrence })
        return isValideted
    }


    if (redirect ) props.history.push("/login")

    return (
        <div className="auth">

            <h3 >Change Password</h3>

            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="userName" label={getFieldsErr("userName", "User Name", fieldsErrMessages)} type="userName" id="userName" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="password" label={getFieldsErr("password", "Password", fieldsErrMessages)} type="password" id="password" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="newPassword" label={getFieldsErr("newPassword", "New Password", fieldsErrMessages)} type="password" id="newPassword" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="confirmPassword" label={getFieldsErr("confirmPassword", "Confirm Password", fieldsErrMessages)} type="password" id="confirmPassword" onChange={handleChange} />
            <Button style={{ margin: "15px", verticalAlign: "top" }} onClick={handleRegister}>Change Password</Button>
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
        onSave: (userObj: IChangePasswordState) => {
            dispatch(changePasswordAction(userObj))
        }
    }
}

export default connect(mapToProps, mapDispatch)(ChangePassword)