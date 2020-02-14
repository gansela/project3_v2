import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { addVacationAction, clearVacationAction, editVacationAction } from "../../redux/actions"
import { connect } from "react-redux"
import useStateWithHandler from "../../hooks/useStateWithHandler"
import { IVacation, ICreateVacation, ICheckVacation, IStateProps } from "../../ts/interfaces"


const time = new Date()
time.setDate(time.getDate() + 1)
const tomorrow = time.toISOString().slice(0, 16)

function CreateVacation(props: ICreateVacation) {
    const { history, addVacation, clearVacation, selectedVacation, editVacation, session } = props
    let vacationToEdit: any = null
    const title = selectedVacation? "Edit Vacation" : "Create New Vacation"
    if (selectedVacation) {
        const { start_date, end_date } = selectedVacation
        vacationToEdit = {
            ...selectedVacation,
            start_date: start_date.slice(0, 16),
            end_date: end_date.slice(0, 16)
        }
    }

    const initialStateValidation: ICheckVacation = {
        price: "",
        description: "",
        destination: "",
        start_date: "",
        end_date: "",
        image: "",
    }

    const initialStateForm: IVacation = {
        id: 0,
        follows: 0,
        price: 0,
        description: "",
        destination: "",
        start_date: tomorrow,
        end_date: tomorrow,
        image: "",
    }
    const [data, handleChange] = useStateWithHandler(vacationToEdit || initialStateForm)
    const [fieldsErrMessages, setFields] = useState(initialStateValidation)


    useEffect(() => {
        if (!session) history.push("/login")
        return () => clearVacation()
    }, [])


    const handleSubmit = async () => {
        const { start_date, end_date, price } = data
        const checked = checkFields()
        const newStart = dateTimeConvert(start_date)
        const newEnd = dateTimeConvert(end_date)
        if (checked && !selectedVacation) {
            await addVacation({ newVacation: { ...data, start_date: newStart, end_date: newEnd } })
            history.push("/home")
        }
        if (checked && selectedVacation) {
            await editVacation({ newVacation: { ...data, start_date: newStart, end_date: newEnd, price: parseInt(price) } })
            history.push("/home")
        }
    }

    const checkFields = () => {
        const checkrefrence = { ...fieldsErrMessages }
        let isValideted = true
        if (data.destination.length < 3 || data.destination.length > 39) {
            checkrefrence.destination = "*destination length should be beetween 3-40 charecters"
            isValideted = false
        } else checkrefrence.destination = ""
        if (data.description.length < 10 || data.description.length > 239) {
            checkrefrence.description = "*destination length should be beetween 10-240 charecters"
            isValideted = false
        } else checkrefrence.description = ""
        if (data.image.length < 1 || data.image.length > 299) {
            checkrefrence.image = "*destination path length innaproppriate"
            isValideted = false
        } else checkrefrence.image = ""
        if ( parseInt(data.price) < 1 || parseInt(data.price) === NaN ) {
            checkrefrence.price = "*vacation must have a a price"
            isValideted = false
        } else checkrefrence.price = ""
        if (data.start_date.valueOf() < tomorrow.valueOf()) {
            checkrefrence.start_date = "*start date can't be in the past"
            isValideted = false
        } else checkrefrence.start_date = ""
        if ((data.start_date.valueOf() + 86400000) > (data.end_date.valueOf())) {
            checkrefrence.end_date = "*vacation should be atleast 24 hours"
            isValideted = false
        } else checkrefrence.end_date = ""
        setFields({ ...checkrefrence })
        if (selectedVacation && isValideted) {
            if (!isEditedChanged()) isValideted = false
        }
        return isValideted
    }

    const isEditedChanged = () => {
        const changedCount = Object.entries(vacationToEdit).filter(([key, value]) => {
            return value !== data[key]
        })
        console.log(changedCount)
        return changedCount.length
    }

    return (
        <div className="home">

            <h3>{title}</h3>

            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="destination" label={getFieldsErr("destination", fieldsErrMessages)} type="text" id="destination" onChange={handleChange} defaultValue={data.destination} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" multiline fullWidth name="description" label={getFieldsErr("description", fieldsErrMessages)} type="text" id="description" onChange={handleChange} defaultValue={data.description} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" fullWidth name="price" label={getFieldsErr("price", fieldsErrMessages)} type="number" id="price" onChange={handleChange} defaultValue={data.price} />
            <TextField aria-label="minimum height" variant="outlined" margin="normal" multiline fullWidth name="image" label={getFieldsErr("image", fieldsErrMessages)} type="number" id="image" onChange={handleChange} defaultValue={data.image} />
            <TextField id="start_date" label={getFieldsErr("start_date", fieldsErrMessages)} name="start_date" variant="outlined" margin="normal" className="timePicker" type="datetime-local" defaultValue={data.start_date} onChange={handleChange} InputLabelProps={{ shrink: true, }} />
            <TextField id="end_date" label={getFieldsErr("end_date", fieldsErrMessages)} name="end_date" variant="outlined" margin="normal" className="timePicker" type="datetime-local" defaultValue={data.end_date} onChange={handleChange} InputLabelProps={{ shrink: true, }} />
            <Button color="primary" style={{ margin: "15px", verticalAlign: "top" }} onClick={handleSubmit}>Submit Vacation</Button>
            <Button style={{ margin: "15px", verticalAlign: "top" }} onClick={() => { history.push("/home") }}>cancel</Button>
        </div>
    )

}

const dateTimeConvert = (time: string) => {
    const splitTime = time.split("T")
    return `${splitTime.join(" ")}:00`
}

const getFieldsErr = (label: string, fieldsErrMessages: any) => {
    const span = fieldsErrMessages[label]
    return (
        <span>{label}<span style={{ "color": "red" }}> {span}</span></span>
    )
}

const mapToProps = (state: IStateProps) => {
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        addVacation: (vacatoin: IVacation) => {
            dispatch(addVacationAction(vacatoin))
        },
        clearVacation: () => {
            dispatch(clearVacationAction())
        },
        editVacation: (vacatoin: IVacation) => {
            dispatch(editVacationAction(vacatoin))
        },
    }
}

export default connect(mapToProps, mapDispatch)(CreateVacation)