import { Box, Button, Fade, IconButton, Modal, Theme, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal, selectModalStatus } from "../../features/Orders/ordersSlice";
import { AppDispatch, IOrder } from "../../utils/interfaces";
import { Add, Cancel, Close, Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import SummaryItem from "../SummaryItem";
import clsx from "clsx";

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
    button: {
        display: "flex"
    }
}))

const OrderModal = ({ order }: {order: IOrder}) => {

    const dispatch = useDispatch<AppDispatch>();

    const classes = useStyles();

    const modalStatus = useSelector(selectModalStatus);

    const handleOpen = (modal: string) => {
        dispatch(openModal({modal}))
    }

    const handleClose = (modal: string) => {
        dispatch(closeModal({modal}));
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
                        <Button
                        variant="contained"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: "#BB0000",
                            transition: 'background-color 0.3s',
                            marginTop: theme.typography.pxToRem(16),
                            '&:hover': {
                                backgroundColor: "#DD0000"
                            }
                        })}
                        onClick={() => handleOpen("cancel")}
                        >
                            <Cancel />
                            <Typography
                            sx={(theme) => ({
                                marginLeft: theme.typography.pxToRem(4),
                                lineHeight: 1
                            })}
                            >
                                Cancel Order
                            </Typography>
                        </Button>
                    </Box>
                </Fade>
            </Modal>
            }
        </>
    );
}
 
export default OrderModal;