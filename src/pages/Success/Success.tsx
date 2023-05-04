import { ArrowBack } from "@mui/icons-material";
import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { clearCart } from "../../features/Cart/cartSlice";
import OrderSummary from "../../features/OrderSummary/OrderSummary";
import { getOrder, selectOrder, selectOrderPending } from "../../features/OrderSummary/orderSummarySlice";
import { AppDispatch, IOrder } from "../../utils/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
    link: {
        display: "flex",
        marginTop: theme.typography.pxToRem(16),
        textDecoration: "none",
        color: "#000",
        transition: "color 0.3s",
        width: "fit-content",
        '&:hover': {
            color: "#0000FF",
        }
    }
}))

const Success = () => {

    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const order: IOrder = useSelector(selectOrder);

    const [searchParams] = useSearchParams();

    const orderNumber = searchParams.get("order_number");
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (!orderNumber && !sessionId) {
            navigate("/");
        }
        if (orderNumber) {
            dispatch(getOrder({orderId: orderNumber!}));
            dispatch(clearCart());
        }
        document.title = "Thank You For Your Purchase | Inspiredbuthellatired";
    }, [])

    return (
        <>
            <section>
                <Typography
                variant="h1"
                sx={(theme) => ({
                    fontSize: theme.typography.pxToRem(32),
                    margin: `0 0 ${theme.typography.pxToRem(16)}`,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    textAlign: "center",
                    [theme.breakpoints.up('md')]: {
                        fontSize: theme.typography.pxToRem(56),
                    }
                })}
                >
                    Inspiredbuthellatired
                </Typography>
                <article>
                    <Typography
                    variant="h2"
                    sx={(theme) => ({
                        margin: `${theme.typography.pxToRem(16)} 0`,
                        fontSize: theme.typography.pxToRem(26),
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(42),
                        }
                    })}
                    >
                        Thank you for your purchase!
                    </Typography>
                    <OrderSummary order={order}/>
                    <Link 
                    to='/'
                    className={classes.link}
                    >
                        <ArrowBack />
                        <Typography
                        sx={(theme) => ({
                            marginLeft: theme.typography.pxToRem(8),
                        })}
                        >
                            Back to home
                        </Typography>
                    </Link>
                </article>
            </section>
        </>
    );
}

export default Success;