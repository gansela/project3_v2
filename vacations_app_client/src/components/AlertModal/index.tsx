
import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from "react-redux"
import { updateAlertMessage } from "../../redux/actions"
import { IAlertModel } from '../../ts/interfaces';
import Button from '@material-ui/core/Button';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            verticalAlign: 'middle',
            textAlign: 'center',
            textDecoration: 'double',
            bordeRadius: '30px',
            position: 'absolute',
            width: 300,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid black',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(3, 4, 3),
        },
    }),
);


function AlertModal(props:IAlertModel | any) {
    const { alertMessage, clearMessage } = props
    const classes = useStyles();

    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (alertMessage) handleOpen()
    }, [alertMessage])


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearMessage()
    };

    return (
        <div className="alert-modal">
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>
                    <h5 id="simple-modal-title">{alertMessage}</h5>
                    <Button color="primary" style={{ margin: "5px", verticalAlign: "top" }} onClick={handleClose}>Got It</Button>
                </div>
            </Modal>
        </div>
    );
}
const mapToProps = (state: any) => {
    return state
}

const mapDispatch = (dispatch: any) => {
    return {
        clearMessage: () => {
            dispatch(updateAlertMessage(""))
        }
    }
}

export default connect(mapToProps, mapDispatch)(AlertModal)