import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux"
import { saveToLocalStorage } from "../../utils/localStorage"
import useStateWithHandler from "../../hooks/useStateWithHandler"
import { registerAction } from "../../redux/actions"
import { IRegister, IRegisterState } from "../../ts/interfaces"



function Register(props: IRegister ) {
    const { onSave } = props
    const initialState: IRegisterState = {
        userName: "",
        firstName: "",
        lastName: "",
        password: "",
    }
    const [data, handleChange] = useStateWithHandler(initialState)

    const handleRegister = () => {
        onSave(data)
        console.log(data)
    }

    useEffect(() => {
        const { redirect } = props
        if (redirect) props.history.push("login")
    }, [props.redirect])

    return (
        <div className="auth">

            <h3 >Register</h3>
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="userName" label="user name" type="userName" id="userName" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="firstName" label="first name" type="firstName" id="firstName" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="lastName" label="last name" type="lastName" id="lastName" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="dense" fullWidth name="password" label="Password" type="password" id="password" onChange={handleChange} />
            <Button   style={{ margin: "15px", verticalAlign: "top" }} onClick={handleRegister}>Register</Button>
        </div>
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