import { Box, Button, Fade, IconButton, Modal, TextField, Theme, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTrackingNumber, changeTrackingField, clearTrackingField, closeModal, deleteOrder, getAllOrders, openModal, selectDeleteModalStatus, selectModalStatus, selectTrackingModalStatus, selectTrackingNumber, toggleError } from "../../features/Orders/ordersSlice";
import { AppDispatch, IOrder } from "../../utils/interfaces";
import { Add, Cancel, Close, Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import SummaryItem from "../SummaryItem";
import clsx from "clsx";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme: Theme) => ({
    headingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    shippingInfo: {
        marginBottom: theme.typography.pxToRem(16)
    },
    orderContainer: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            display: "flex",
            width: '100%'
        }
    },
    orderSubContainer: {
        display: 'flex',
        flexDirection: 'column',
        '&:first-of-type': {
            marginBottom: theme.typography.pxToRem(16)
        },
        [theme.breakpoints.up('md')]: {
            width: '50%'
        }

    },
    orderInfo: {
        display: 'flex',
        alignItems: 'center'
    },
    total: {
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-end",
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.typography.pxToRem(50)
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.typography.pxToRem(16)
    },
    buttonContainerSpecial: {
        display: 'none',
        margin: 0,
        [theme.breakpoints.up('md')]: {
            display: "flex"
        }
    },
    deleteButtons: {
        display: 'flex',
        alignSelf: 'center',
        margin: `${theme.typography.pxToRem(36)} 0`
    }
}))

const OrderModal = ({ order }: {order: IOrder}) => {

    const dispatch = useDispatch<AppDispatch>();

    const classes = useStyles();

    const modalStatus = useSelector(selectModalStatus);
    const trackingModalStatus = useSelector(selectTrackingModalStatus);
    const trackingNumber = useSelector(selectTrackingNumber);
    const deleteModalStatus = useSelector(selectDeleteModalStatus);

    const token = localStorage.getItem("token")?.split(' ')[1]!;

    const handleOpen = (modal: string) => {
        dispatch(openModal({modal}))
    }

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
            .then(() => {
                handleClose("tracking");
                toast.success("Tracking Number Added!");
                dispatch(getAllOrders({token}));
            })
            .catch((err) => {
                toast.error("Something went wrong!")
            })
    }

    const handleDelete = () => {
        dispatch(deleteOrder({token, id: order.id}))
            .then(() => {
                handleClose("delete");
                toast.success("Order Successfully Deleted!");
                dispatch(getAllOrders({token}))
            })
            .catch(() => {
                toast.error("Order is not fulilled and can't be deleted")
            })
    }

    return (
        <>
            {order.id &&
            <Modal
            open={modalStatus}
            onClose={handleClose}
            >
                <Fade
                in={modalStatus}
                >
                    <Box
                    sx={theme => ({
                        position: "absolute" as 'absolute',
                        top: "50%",
                        left: "50%",
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: "#FFF",
                        width: "95vw",
                        maxWidth: theme.typography.pxToRem(500),
                        height: theme.typography.pxToRem(600),
                        display: "flex",
                        flexDirection: "column",
                        padding: theme.typography.pxToRem(16),
                        borderRadius: theme.typography.pxToRem(4),
                        outline: "none",
                        overflowY: 'scroll',
                        '&::-webkit-scrollbar': {
                            width: `${theme.typography.pxToRem(10)}`
                        },
                        '&::-webkit-scrollbar-track': {
                            margin: theme.typography.pxToRem(8),
                            borderRadius: `${theme.typography.pxToRem(4)}`,
                            backgroundColor: 'rgba(0, 0, 0, 0.35)'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: "#000",
                            borderRadius: `${theme.typography.pxToRem(10)}`
                        },
                        [theme.breakpoints.up('md')]: {
                            maxWidth: theme.typography.pxToRem(650),
                            padding: `${theme.typography.pxToRem(24)}`,
                        }
                    })}
                    >
                        <IconButton
                        sx={(theme) => ({
                            alignSelf: "flex-end"
                        })}
                        onClick={() => handleClose("order")}
                        >
                            <Close />
                        </IconButton>
                        <div
                        className={classes.headingContainer}
                        >
                            <Typography
                            variant="h2"
                            sx={(theme) => ({
                                fontFamily: 'Nunito Sans',
                                fontSize: theme.typography.pxToRem(18),
                                margin: `${theme.typography.pxToRem(16)} 0`,
                                [theme.breakpoints.up('md')]: {
                                    fontSize: theme.typography.pxToRem(22)
                                }
                            })}
                            >
                                Order No.: {order.orderId}
                            </Typography>
                            <div
                            className={clsx(classes.buttonContainer, classes.buttonContainerSpecial)}
                            >
                                <Button
                                variant="contained"
                                sx={(theme) => ({
                                    display: 'none',
                                    marginRight: theme.typography.pxToRem(8),
                                    [theme.breakpoints.up('md')]: {
                                        display: 'flex',
                                        alignItems: 'center'
                                    }
                                })}
                                onClick={() => handleOpen("tracking")}
                                >
                                    <Add 
                                    sx={(theme) => ({
                                        fontSize: `1rem`,
                                        marginRight: theme.typography.pxToRem(4)
                                    })}
                                    />
                                    <Typography
                                    sx={(theme) => ({
                                        fontSize: `0.75rem`,
                                    })}
                                    >
                                        Add Tracking
                                    </Typography>
                                </Button>
                                <Button
                                variant="contained"
                                sx={(theme) => ({
                                    display: 'none',
                                    [theme.breakpoints.up('md')]: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#DD0000',
                                        transition: 'background-color 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#BB0000'
                                        }
                                    }
                                })}
                                onClick={() => handleOpen("delete")}
                                >
                                    <Delete 
                                    sx={(theme) => ({
                                        fontSize: `1rem`,
                                        marginRight: theme.typography.pxToRem(4)
                                    })}
                                    />
                                    <Typography
                                    sx={(theme) => ({
                                        fontSize: `0.75rem`
                                    })}
                                    >
                                        Delete Order
                                    </Typography>
                                </Button>
                            </div>
                        </div>
                        <div
                        className={classes.buttonContainer}
                        >
                            <Button
                            variant="contained"
                            sx={(theme) => ({
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: theme.typography.pxToRem(8),
                                [theme.breakpoints.up('md')]: {
                                    display: 'none',
                                }
                            })}
                            onClick={() => handleOpen("tracking")}
                            >
                                <Add 
                                sx={(theme) => ({
                                    fontSize: `1rem`,
                                    marginRight: theme.typography.pxToRem(4)
                                })}
                                />
                                <Typography
                                sx={(theme) => ({
                                    fontSize: `0.75rem`,
                                })}
                                >
                                    Add Tracking
                                </Typography>
                            </Button>
                            <Button
                            variant="contained"
                            sx={(theme) => ({
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#DD0000',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: '#BB0000'
                                },
                                [theme.breakpoints.up('md')]: {
                                    display: 'none',
                                }
                            })}
                            onClick={() => handleOpen("delete")}
                            >
                                <Delete 
                                sx={(theme) => ({
                                    fontSize: `1rem`,
                                    marginRight: theme.typography.pxToRem(4)
                                })}
                                />
                                <Typography
                                sx={(theme) => ({
                                    fontSize: `0.75rem`,
                                })}
                                >
                                    Delete Order
                                </Typography>
                            </Button>
                        </div>
                        <div
                        className={classes.orderContainer}
                        >
                            <div
                            className={classes.orderSubContainer}
                            >
                                <article
                                className={classes.shippingInfo}
                                >
                                    <Typography
                                    variant="h3"
                                    sx={(theme) => ({
                                        fontSize: theme.typography.pxToRem(18),
                                        marginBottom: theme.typography.pxToRem(8),
                                        textDecoration: "underline"
                                    })}
                                    >
                                        Shipping Info
                                    </Typography>
                                    <Typography
                                    sx={(theme) => ({
                                        fontSize: theme.typography.pxToRem(18)
                                    })}
                                    >
                                        {order!.shippingInfo.name}
                                    </Typography>
                                    <Typography
                                    sx={(theme) => ({
                                        fontSize: theme.typography.pxToRem(18)
                                    })}
                                    >
                                        {order!.shippingInfo.addressLineOne}
                                    </Typography>
                                    {order!.shippingInfo.addressLineTwo && 
                                    <Typography
                                    sx={(theme) => ({
                                        fontSize: theme.typography.pxToRem(18)
                                    })}
                                    >
                                        {order!.shippingInfo.addressLineTwo}
                                    </Typography>
                                    }
                                    <Typography
                                    sx={(theme) => ({
                                        fontSize: theme.typography.pxToRem(18)
                                    })}
                                    >
                                        {order!.shippingInfo.city}, {order!.shippingInfo.state}
                                    </Typography>
                                    <Typography
                                    sx={(theme) => ({
                                        fontSize: theme.typography.pxToRem(18)
                                    })}
                                    >
                                        {order!.shippingInfo.postalCode}
                                    </Typography>
                                </article>
                                <article>
                                    <Typography
                                    variant="h3"
                                    sx={(theme) => ({
                                        fontSize: theme.typography.pxToRem(18),
                                        marginBottom: theme.typography.pxToRem(8),
                                        textDecoration: "underline"
                                    })}
                                    >
                                        Order Status
                                    </Typography>
                                    <div
                                    className={classes.orderInfo}
                                    >
                                        <Typography
                                        variant="h4"
                                        sx={(theme) => ({
                                            fontFamily: 'Nunito Sans',
                                            fontSize: theme.typography.pxToRem(18),
                                            marginRight: theme.typography.pxToRem(8)
                                        })}
                                        >
                                            Payment Status:
                                        </Typography>
                                        <Typography
                                        sx={(theme) => ({
                                            fontSize: theme.typography.pxToRem(18),
                                        })}
                                        >
                                            {order.paymentStatus.toLocaleUpperCase()}
                                        </Typography>
                                    </div>
                                    <div
                                    className={classes.orderInfo}
                                    >
                                        <Typography
                                        variant="h4"
                                        sx={(theme) => ({
                                            fontFamily: 'Nunito Sans',
                                            fontSize: theme.typography.pxToRem(18),
                                            marginRight: theme.typography.pxToRem(8)
                                        })}
                                        >
                                            Order Fulfilled?
                                        </Typography>
                                        <Typography
                                        sx={(theme) => ({
                                            fontSize: theme.typography.pxToRem(18),
                                        })}
                                        >
                                            {order.shippingInfo.isFulfilled ? "Yes" : "No"}
                                        </Typography>
                                    </div>
                                    <div
                                    className={classes.orderInfo}
                                    >
                                        <Typography
                                        variant="h4"
                                        sx={(theme) => ({
                                            fontFamily: 'Nunito Sans',
                                            fontSize: theme.typography.pxToRem(18),
                                            marginRight: theme.typography.pxToRem(8)
                                        })}
                                        >
                                            Tracking:
                                        </Typography>
                                        <Typography
                                        sx={(theme) => ({
                                            fontSize: theme.typography.pxToRem(18),
                                        })}
                                        >
                                            {!order.shippingInfo.trackingNumber ? "N/A" : order.shippingInfo.trackingNumber}
                                        </Typography>
                                    </div>
                                </article>
                            </div>
                            <div
                            className={classes.orderSubContainer}
                            >
                                <Typography
                                variant="h4"
                                sx={(theme) => ({
                                    fontSize: theme.typography.pxToRem(18),
                                    marginBottom: theme.typography.pxToRem(4),
                                    textDecoration: "underline"
                                })}
                                >
                                    Items
                                </Typography>
                                {order!.items.map((item) => (
                                    <SummaryItem 
                                    key={item.id}
                                    item={item}
                                    />
                                ))}
                                <div
                                className={classes.total}
                                >
                                    <Typography
                                    sx={(theme) => ({
                                        fontSize: theme.typography.pxToRem(18),
                                        fontWeight: 600,
                                        marginRight: theme.typography.pxToRem(8)
                                    })}
                                    >
                                        Total:
                                    </Typography>
                                    <Typography>
                                        ${(Number(order!.total) / 100).toFixed(2)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
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
                        <Modal
                        open={deleteModalStatus}
                        onClose={() => handleClose("delete")}
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
                                onClick={() => handleClose("delete")}
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
                                    Are you sure you want to delete this order? (This action cannot be undone)
                                </Typography>
                                <div
                                className={classes.deleteButtons}
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
                                    onClick={() => handleClose("delete")}
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
                                    <Button
                                    variant="contained"
                                    sx={(theme) => ({
                                        marginRight: theme.typography.pxToRem(8),
                                        display: 'flex',
                                        alignItems: 'center'
                                    })}
                                    onClick={handleDelete}
                                    >
                                        <Delete 
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
                                            Delete
                                        </Typography>
                                    </Button>
                                </div>
                            </Box>
                        </Modal>
                    </Box>
                </Fade>
            </Modal>
            }
        </>
    );
}
 
export default OrderModal;