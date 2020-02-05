import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { changePasswordAction } from "../../redux/actions"
import { connect } from "react-redux"
import useStateWithHandler from "../../hooks/useStateWithHandler"
import { IVacation, ICreateVacation } from "../../ts/interfaces"





function CreateVacation(props: ICreateVacation) {
    const { history } = props
    const initialState: IVacation = {
        id: 1,
        follows: 0,
        price: 0,
        description: "",
        destination: "",
        start_date: "",
        end_date: "",
        image: "",
    }
    const [data, handleChange] = useStateWithHandler(initialState)

    const handleRegister = () => {
        // onSave(data)
    }

    // if (redirect ) props.history.push("/login")

    return (
        <div className="home">

            <h3 >Create New Vacation</h3>

            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="destination" label="destination " type="text" id="destination" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" multiline fullWidth name="description" label="description" type="text" id="description" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="price" label="price" type="text" id="price" onChange={handleChange} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" multiline fullWidth name="image" label="image" type="number" id="image" onChange={handleChange} />
            <TextField id="start_date" label="start date"  variant="outlined" margin="normal" className="timePicker" type="datetime-local" defaultValue="2017-05-24T10:30" InputLabelProps={{ shrink: true, }} />
            <TextField id="datetime-local" label="end date"  variant="outlined" margin="normal" className="timePicker" type="datetime-local" defaultValue="2017-05-24T10:30" InputLabelProps={{ shrink: true, }} />
            <Button color="primary" style={{ margin: "15px", verticalAlign: "top" }} onClick={handleRegister}>Submit Vacation</Button>
            <Button style={{ margin: "15px", verticalAlign: "top" }} onClick={() => { history.push("/home") }}>cancel</Button>
        </div>
    )

}


const mapToProps = (state: any) => {
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        // onSave: (userObj: IChangePasswordState) => {
        //     dispatch(changePasswordAction(userObj))
        // }
    }
}

export default connect(mapToProps, mapDispatch)(CreateVacation)