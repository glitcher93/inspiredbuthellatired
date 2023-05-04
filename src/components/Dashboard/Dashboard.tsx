import { Typography } from "@mui/material";
import Orders from "../../features/Orders/Orders";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../utils/interfaces";
import { useEffect } from "react";
import { clearOrders, getRecentOrders, selectOrder, selectOrders } from "../../features/Orders/ordersSlice";
import OrderModal from "../OrderModal/OrderModal";
import TrackingModal from "../TrackingModal";
import DeleteOrderModal from "../DeleteOrderModal";
import CancelOrderModal from "../CancelOrderModal";

const Dashboard = () => {

    const orders = useSelector(selectOrders);
    const order = useSelector(selectOrder);

    const dispatch = useDispatch<AppDispatch>();

    const token = localStorage.getItem("token")?.split(' ')[1]!;

    useEffect(() => {
        dispatch(getRecentOrders({token}))
        document.title = "Dashboard | Insiredbuthellatired";

        return () => {
            dispatch(clearOrders());
        }
    }, [dispatch])

    return (
        <section>
            <Typography
            variant="h1"
            sx={(theme) => ({
                [theme.breakpoints.up('md')]: {
                    fontSize: theme.typography.pxToRem(56)
                }
            })}
            >
                Hi, Alyssa!
            </Typography>
            <Typography
            variant="h2"
            sx={(theme) => ({
                fontSize: theme.typography.pxToRem(26),
                margin: `${theme.typography.pxToRem(16)} 0`,
                [theme.breakpoints.up('md')]: {
                    fonstSize: theme.typography.pxToRem(36)
                }
            })}
            >
                Welcome to your dashboard!
            </Typography>
            {orders.length > 0 ? <Orders orders={orders} /> : <Typography>No Orders right now!</Typography>}
            <OrderModal order={order} />
            <TrackingModal order={order} />
            <DeleteOrderModal order={order} />
            <CancelOrderModal order={order} />
        </section>
    );
}
 
export default Dashboard;