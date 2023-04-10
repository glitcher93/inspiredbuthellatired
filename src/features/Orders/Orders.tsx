import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import { AppDispatch, IOrder } from "../../utils/interfaces";
import { useDispatch } from "react-redux";
import { openModal } from "./ordersSlice";

const useStyles = makeStyles((theme: Theme) => ({
    orders: {
        outline: '1px solid #000',
        borderRadius: '4px',
        maxWidth: '600px',
        backgroundColor: "#E1E1E1"
    },
    order: {
        padding: theme.typography.pxToRem(16),
        borderBottom: '1px solid #000',
        '&:last-of-type': {
            borderBottom: 'none'
        }
    },
    orderContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    link: {
        textDecoration: "none",
        color: "#000",
        transition: "color 0.3s ease-in-out",
        cursor: "pointer",
        '&:hover': {
            color: "#0000FF"
        }
    }
}))

const Orders = ({ orders }: {orders: IOrder[]}) => {

    const dispatch = useDispatch<AppDispatch>();

    const location = useLocation();

    const classes = useStyles();

    const handleClick = (order: IOrder, modal: string) => {
        dispatch(openModal({order, modal}));
    }

    if (location.pathname === '/admin/orders') {
        return (
            <ul
            className={classes.orders}
            >
                {orders.map(order => {
                    return (
                        <li
                        key={order.id}
                        className={classes.order}
                        >
                            <div
                            className={classes.orderContainer}
                            >
                                
                                <Typography
                                className={classes.link}
                                onClick={() => handleClick(order, "order")}
                                >
                                    {order.orderId}
                                </Typography>
                                <Typography
                                sx={(theme) => ({
                                    display: 'none',
                                    [theme.breakpoints.up(600)]: {
                                        display: 'block'
                                    }
                                })}
                                >
                                Customer: {order.shippingInfo.name}
                                </Typography>
                                <Typography>
                                    {new Date(order.shippingInfo.createdAt).toLocaleDateString()}
                                </Typography>
                            </div>
                            <Typography
                            sx={(theme) => ({
                                [theme.breakpoints.up(600)]: {
                                    display: 'none'
                                }
                            })}
                            >
                                Customer: {order.shippingInfo.name}
                            </Typography>
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <article>
            <Typography
            variant="h3"
            sx={(theme) => ({
                fontSize: theme.typography.pxToRem(22),
                margin: `${theme.typography.pxToRem(8)} 0`,
                textDecoration: 'underline'
            })}
            >
                Recent Orders                
            </Typography>
            <ul
            className={classes.orders}
            >
                {orders.map(order => {
                    return (
                        <li
                        key={order.id}
                        className={classes.order}
                        >
                            <div
                            className={classes.orderContainer}
                            >
                                <Typography
                                className={classes.link}
                                onClick={() => handleClick(order, "order")}
                                >
                                    {order.orderId}
                                </Typography>
                                <Typography
                                sx={(theme) => ({
                                    display: 'none',
                                    [theme.breakpoints.up(600)]: {
                                        display: 'block'
                                    }
                                })}
                                >
                                    Customer: {order.shippingInfo.name}
                                </Typography>
                                <Typography>
                                    {new Date(order.shippingInfo.createdAt).toLocaleDateString()}
                                </Typography>
                            </div>
                            <Typography
                            sx={(theme) => ({
                                [theme.breakpoints.up(600)]: {
                                    display: 'none'
                                }
                            })}
                            >
                                Customer: {order.shippingInfo.name}
                            </Typography>
                        </li>
                    )
                })}
            </ul>
        </article>
    );
}
 
export default Orders;