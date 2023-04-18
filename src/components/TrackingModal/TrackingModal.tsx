import { Close } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Theme, Typography } from "@mui/material";
import { addTrackingNumber, changeTrackingField, clearTrackingField, closeModal, getAllOrders, selectTrackingModalStatus, selectTrackingNumber, toggleError } from "../../features/Orders/ordersSlice";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IOrder } from "../../utils/interfaces";
import { ChangeEvent, FormEvent } from "react";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.typography.pxToRem(50)
    }
}))

const TrackingModal = ({order}: {order: IOrder}) => {

    const dispatch = useDispatch<AppDispatch>();

    const classes = useStyles();

    const trackingModalStatus = useSelector(selectTrackingModalStatus);
    const trackingNumber = useSelector(selectTrackingNumber);

    const token = localStorage.getItem("token")?.split(' ')[1]!;

    const handleClose = (modal: string) => {
        dispatch(closeModal({modal}));
        dispatch(clearTrackingField());
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        dispatch(changeTrackingField(value))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!trackingNumber) {
            dispatch(toggleError())
            return;
        }

        dispatch(addTrackingNumber({token, id: order.id, trackingNumber}))
            .unwrap()
            .then(() => {
                handleClose("tracking");
                handleClose("order");
                dispatch(getAllOrders({token}))
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Tracking Number Added!',
                            timer: 2000,
                            showConfirmButton: false
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Something went wrong',
                    text: `${err.message}`
                })
            })
    }

    return (
        <Modal
        open={trackingModalStatus}
        onClose={() => handleClose('tracking')}
        >
            <Box
            sx={(theme) => ({
                position: "absolute" as 'absolute',
                top: "50%",
                left: "50%",
                transform: 'translate(-50%, -50%)',
                backgroundColor: "#FFF",
                width: '85%',
                height: theme.typography.pxToRem(250),
                display: "flex",
                flexDirection: "column",
                padding: theme.typography.pxToRem(16),
                borderRadius: theme.typography.pxToRem(4),
                outline: "none",
                maxWidth: `492px`
            })}
            >
                <Close 
                sx={(theme) => ({
                    alignSelf: 'flex-end',
                    cursor: 'pointer'
                })}
                onClick={() => handleClose("tracking")}
                />
                <Typography
                variant='h4'
                sx={(theme) => ({
                    fontFamily: 'Nunito Sans',
                    fontSize: theme.typography.pxToRem(18)
                })}
                >
                    Enter Tracking Number
                </Typography>
                <form
                method="PATCH"
                action={`/admin/orders/add-tracking/${order.id}`}
                className={classes.form}
                onSubmit={handleSubmit}
                >
                    <TextField 
                    label="Tracking Number"
                    name="trackingNumber"
                    value={trackingNumber}
                    onChange={handleChange}
                    sx={(theme) => ({
                        marginRight: theme.typography.pxToRem(16),
                        width: '60%'
                    })}
                    />
                    <Button
                    variant="contained"
                    sx={(theme) => ({
                        height: '100%'
                    })}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
 
export default TrackingModal;