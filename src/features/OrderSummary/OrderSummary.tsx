import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useSelector } from "react-redux";
import SummaryItem from "../../components/SummaryItem";
import { IOrder } from "../../utils/interfaces";
import { selectOrder } from "./orderSummarySlice";

const useStyles = makeStyles((theme: Theme) => ({
    orderSummary: {
        outline: "2px solid black",
        borderRadius: "4px",
        padding: theme.typography.pxToRem(16),
    },
    orderInfo: {
        display: "flex",
        alignItems: "center",
        margin: `${theme.typography.pxToRem(16)} 0`,
    },
    orderInfoSpecial: {
        alignItems: "flex-start",
        flexDirection: "column",
    },
    orderFlex: {
        [theme.breakpoints.up('md')]: {
            display: "flex",
            width: '100%'
        }
    },
    shipping: {
        [theme.breakpoints.up('md')]: {
            width: '40%'
        }
    },
    items: {
        [theme.breakpoints.up('md')]: {
            width: '60%'
        }
    },
    total: {
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-end",
    }
}))

const OrderSummary = () => {

    const classes = useStyles();

    const order: IOrder | null = useSelector(selectOrder);

    return (
        <div
        className={classes.orderSummary}
        >
            <Typography
            variant="h3"
            sx={(theme) => ({
                fontSize: theme.typography.pxToRem(22),
                textDecoration: "underline",
            })}
            >
                Order Summary
            </Typography>
            <div
            className={classes.orderInfo}
            >
                <Typography
                variant="h4"
                sx={(theme) => ({
                    fontFamily: 'Nunito Sans',
                    fontSize: theme.typography.pxToRem(16),
                    marginRight: theme.typography.pxToRem(8),
                    [theme.breakpoints.up('md')]: {
                        fontSize: theme.typography.pxToRem(18)
                    }
                    
                })}
                >
                    Order No.:
                </Typography>
                <Typography
                sx={(theme) => ({
                    fontSize: theme.typography.pxToRem(16),
                    [theme.breakpoints.up('md')]: {
                        fontSize: theme.typography.pxToRem(18)
                    }
                })}
                >
                    {order!.orderId}
                </Typography>
            </div>
            <div
            className={classes.orderFlex}
            >
                <div
                className={clsx(classes.orderInfo, classes.orderInfoSpecial, classes.shipping)}
                >
                    <Typography
                    variant="h4"
                    sx={(theme) => ({
                        fontFamily: 'Nunito Sans',
                        fontSize: theme.typography.pxToRem(16),
                        marginBottom: theme.typography.pxToRem(4),
                        textDecoration: "underline",
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(18)
                        }
                    })}
                    >
                        Shipping Info
                    </Typography>
                    <Typography
                    sx={(theme) => ({
                        fontSize: theme.typography.pxToRem(16),
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(18)
                        }
                    })}
                    >
                        {order!.shippingInfo.name}
                    </Typography>
                    <Typography
                    sx={(theme) => ({
                        fontSize: theme.typography.pxToRem(16),
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(18)
                        }
                    })}
                    >
                        {order!.shippingInfo.addressLineOne}
                    </Typography>
                    {order!.shippingInfo.addressLineTwo && 
                    <Typography
                    sx={(theme) => ({
                        fontSize: theme.typography.pxToRem(16),
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(18)
                        }
                    })}
                    >
                        {order!.shippingInfo.addressLineTwo}
                    </Typography>
                    }
                    <Typography
                    sx={(theme) => ({
                        fontSize: theme.typography.pxToRem(16),
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(18)
                        }
                    })}
                    >
                        {order!.shippingInfo.city}, {order!.shippingInfo.state}
                    </Typography>
                    <Typography
                    sx={(theme) => ({
                        fontSize: theme.typography.pxToRem(16),
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(18)
                        }
                    })}
                    >
                        {order!.shippingInfo.postalCode}
                    </Typography>
                </div>
                <div
                className={clsx(classes.orderInfo, classes.orderInfoSpecial, classes.items)}
                >
                    <Typography
                    variant="h4"
                    sx={(theme) => ({
                        fontFamily: 'Nunito Sans',
                        fontSize: theme.typography.pxToRem(16),
                        marginBottom: theme.typography.pxToRem(4),
                        textDecoration: "underline",
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(18)
                        }
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
                            marginRight: theme.typography.pxToRem(16)
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
        </div>
    );
}

export default OrderSummary;