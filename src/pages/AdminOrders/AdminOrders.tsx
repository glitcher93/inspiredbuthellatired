import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, selectOrder, selectOrders } from "../../features/Orders/ordersSlice";
import { useEffect } from "react";
import { AppDispatch } from "../../utils/interfaces";
import { Typography } from "@mui/material";
import Orders from "../../features/Orders";
import OrderModal from "../../components/OrderModal";
import TrackingModal from "../../components/TrackingModal";
import DeleteOrderModal from "../../components/DeleteOrderModal";
import CancelOrderModal from "../../components/CancelOrderModal";

const AdminOrders = () => {

    const dispatch = useDispatch<AppDispatch>();

    const orders = useSelector(selectOrders);
    const order = useSelector(selectOrder);

    const token = localStorage.getItem('token')?.split(' ')[1]!;
    
    useEffect(() => {
        dispatch(getAllOrders({token}))
    }, [dispatch]);

    return (
        <>
            <section>
                <Typography
                variant="h1"
                sx={(theme) => ({
                    marginBottom: theme.typography.pxToRem(16),
                    [theme.breakpoints.up('md')]: {
                        fontSize: theme.typography.pxToRem(56)
                    }
                })}
                >
                    Orders
                </Typography>
                <Orders orders={orders} />
                <OrderModal order={order} />
                <TrackingModal order={order} />
                <DeleteOrderModal order={order} />
                <CancelOrderModal order={order} />
            </section>
        </>
    );
}
 
export default AdminOrders;