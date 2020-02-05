import React from "react";
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
    const [data, handleChange] = useStateWithHandler(initialState)

    const handleRegister = () => {
        onSave(data)
    }

    if (redirect ) props.history.push("/login")

    return (
        <div className="auth">

            <h3 >Change Password</h3>

            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="userName" label="user name" type="userName" id="userName" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="password" label="Password" type="password" id="password" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="newPassword" label="New Password" type="password" id="newPassword" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="confirmPassword" label="confirm new password" type="password" id="confirmPassword" onChange={handleChange} />
            <Button style={{ margin: "15px", verticalAlign: "top" }} onClick={handleRegister}>Change Password</Button>
        </div>
    )

}


const mapToProps = (state: any) => {
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        onSave: (userObj: IChangePasswordState) => {
            dispatch(changePasswordAction(userObj))
            // dispatch(stopSession())
        }
    }
}

export default connect(mapToProps, mapDispatch)(ChangePassword)