import { Cancel, Close, Delete } from "@mui/icons-material";
import { Box, Button, Modal, Theme, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getAllOrders, selectCancelModalStatus } from "../../features/Orders/ordersSlice";
import { AppDispatch, IOrder } from "../../utils/interfaces";
import { closeModal } from "../../features/Orders/ordersSlice";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme: Theme) => ({
    cancelButtons: {
        display: 'flex',
        alignSelf: 'center',
        margin: `${theme.typography.pxToRem(36)} 0`
    }
}))

const CancelOrderModal = ({order}: {order: IOrder}) => {

    const dispatch = useDispatch<AppDispatch>();

    const classes = useStyles();

    const cancelModalStatus = useSelector(selectCancelModalStatus);

    const token = localStorage.getItem("token")?.split(' ')[1]!;

    const handleClose = (modal: string) => {
        dispatch(closeModal({modal}))
    }

    const handleCancel = () => {
        dispatch(cancelOrder({token, paymentIntentId: order.paymentIntentId!}))
            .unwrap()
            .then(() => {
                handleClose('cancel');
                handleClose('order');
                dispatch(getAllOrders({token}))
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Order Cancelled!",
                            timer: 2000,
                            showConfirmButton: false
                        })
                    })
                    .catch(err => console.log(err))
            })
            .catch((err) => {
                handleClose('cancel');
                handleClose('order');
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: `${err.message}`
                })
            })
    }

    return (
        <Modal
        open={cancelModalStatus}
        onClose={() => handleClose("cancel")}
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
                onClick={() => handleClose("cancel")}
                />
                <Typography
                variant='h4'
                sx={(theme) => ({
                    fontFamily: 'Nunito Sans',
                    fontSize: theme.typography.pxToRem(18)
                })}
                >
                    Delete Order?
                </Typography>
                <Typography
                sx={(theme) => ({
                    marginTop: theme.typography.pxToRem(24),
                    textAlign: 'center'
                })}
                >
                    Are you sure you want to cancel this order? (This action cannot be undone)
                </Typography>
                <div
                className={classes.cancelButtons}
                >
                    <Button
                    variant="contained"
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#DD0000',
                        transition: 'background-color 0.3s',
                        marginRight: theme.typography.pxToRem(8),
                        '&:hover': {
                            backgroundColor: '#BB0000'
                        }
                    })}
                    onClick={() => handleClose("cancel")}
                    >
                        <Close 
                        sx={(theme) => ({
                            fontSize: `1rem`,
                            marginRight: theme.typography.pxToRem(4)
                        })}
                        />
                        <Typography
                        sx={(theme) => ({
                            fontSize: `1rem`
                        })}
                        >
                            Close
                        </Typography>
                    </Button>
                    <Button
                    variant="contained"
                    sx={(theme) => ({
                        marginRight: theme.typography.pxToRem(8),
                        display: 'flex',
                        alignItems: 'center'
                    })}
                    onClick={handleCancel}
                    >
                        <Cancel 
                        sx={(theme) => ({
                            fontSize: `1rem`,
                            marginRight: theme.typography.pxToRem(4)
                        })}
                        />
                        <Typography
                        sx={(theme) => ({
                            fontSize: `1rem`
                        })}
                        >
                            Cancel
                        </Typography>
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}
 
export default CancelOrderModal;