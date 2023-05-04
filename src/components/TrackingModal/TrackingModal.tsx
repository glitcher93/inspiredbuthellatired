import { Close } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Theme, Typography } from "@mui/material";
import { addTrackingNumber, changeField, clearFields, closeModal, getAllOrders, selectServiceProvider, selectServiceProviderError, selectTrackingError, selectTrackingModalStatus, selectTrackingNumber, toggleError } from "../../features/Orders/ordersSlice";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IOrder } from "../../utils/interfaces";
import { ChangeEvent, FormEvent } from "react";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    popup: {
        fontFamily: '"Nunito Sans", sans-serif'
    }
}))

const TrackingModal = ({order}: {order: IOrder}) => {

    const dispatch = useDispatch<AppDispatch>();

    const classes = useStyles();

    const trackingModalStatus = useSelector(selectTrackingModalStatus);
    const trackingNumber = useSelector(selectTrackingNumber);
    const trackingNumberError = useSelector(selectTrackingError)
    const serviceProvider = useSelector(selectServiceProvider);
    const serviceProviderError = useSelector(selectServiceProviderError);

    const token = localStorage.getItem("token")?.split(' ')[1]!;

    const handleClose = (modal: string) => {
        dispatch(closeModal({modal}));
        dispatch(clearFields());
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        dispatch(changeField({name, value}))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!trackingNumber) {
            dispatch(toggleError({name: "trackingNumber"}))
        }

        if (!serviceProvider) {
            dispatch(toggleError({name: "serviceProvider"}))
        }

        if (!trackingNumber || !serviceProvider) {
            return;
        }

        dispatch(addTrackingNumber({token, id: order.id, trackingNumber, serviceProvider}))
            .unwrap()
            .then(() => {
                handleClose("tracking");
                handleClose("order");
                dispatch(getAllOrders({token}))
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Tracking Number Added!',
                            customClass: {
                                popup: classes.popup
                            },
                            timer: 2000,
                            showConfirmButton: false
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch((err) => {
                handleClose('tracking');
                handleClose('order');
                Swal.fire({
                    icon: 'error',
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
                height: theme.typography.pxToRem(275),
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
                className={classes.form}
                onSubmit={handleSubmit}
                >
                    <TextField 
                    label="Tracking Number"
                    name="trackingNumber"
                    value={trackingNumber}
                    onChange={handleChange}
                    error={trackingNumberError}
                    sx={(theme) => ({
                        margin: `${theme.typography.pxToRem(16)} 0`,
                        width: '100%'
                    })}
                    />
                    <TextField 
                    label="Service Provider"
                    name="serviceProvider"
                    value={serviceProvider}
                    onChange={handleChange}
                    error={serviceProviderError}
                    sx={(theme) => ({
                        marginBottom: theme.typography.pxToRem(16),
                        width: '100%'
                    })}
                    />
                    <Button
                    variant="contained"
                    type="submit"
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