import { Close } from "@mui/icons-material";
import { Typography, Theme, IconButton, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector} from "react-redux";
import { AppDispatch } from "../../utils/interfaces";
import { toggleDrawerOpen } from "../AppContent/appContentSlice";
import CartItem from "../../components/CartItem";
import { checkout, selectCart } from "./cartSlice";
import { FormEvent } from "react";

const useStyles = makeStyles((theme: Theme) => ({
    cartContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: `${theme.typography.pxToRem(24)}`,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    items: {
        marginTop: `${theme.typography.pxToRem(24)}`,
        width: `100%`,
    },
    cartTotal: {
        display: 'flex',
        marginTop: `${theme.typography.pxToRem(36)}`,
        alignSelf: 'flex-end',
    },
    formDiv: {
        display: "flex",
        flexDirection: "column"
    },
    form: {
        alignSelf: "flex-end"
    }
}));

const Cart = () => {

    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();

    const handleClose = () => {
        dispatch(toggleDrawerOpen(false));
    }

    const cart = useSelector(selectCart);

    const price = cart.reduce((acc, item) => acc + ((Number(item.priceInCents) / 100) * item.quantity!), 0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        
        dispatch(checkout({cart}))
    }


    return (
        <div
        className={classes.cartContainer}
        >
            <div
            className={classes.header}
            >
                <Typography
                variant="h4"
                >
                    Cart
                </Typography>
                <IconButton
                onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </div>
            <div
            className={classes.items}
            >
                {cart.length ? cart.map(item => (
                    <CartItem
                    key={item.id} 
                    item={item}
                    />
                )) :
                <Typography
                sx={(theme) => ({
                    textAlign: 'center',
                    fontSize: theme.typography.pxToRem(18),
                    color: '#777',
                    marginTop: theme.typography.pxToRem(24)
                })}
                >
                    Your cart is empty
                </Typography>
                }
            </div>
            {cart.length >= 1 &&
            <div
            className={classes.cartTotal}
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
                <Typography
                sx={(theme) => ({
                    fontSize: theme.typography.pxToRem(18),
                    fontWeight: 600
                })}
                >
                    ${price.toFixed(2)}
                </Typography>
            </div>
            }
            {cart.length >= 1 &&
            <div
            className={classes.formDiv}
            >
                <form
                action="/checkout"
                method="POST"
                onSubmit={handleSubmit}
                className={classes.form}
                >
                    <Button
                    sx={(theme) => ({
                        backgroundColor: "#0000BB",
                        color: "#FFF",
                        padding: 1,
                        transition: 'background-color 0.3s',
                        marginTop: theme.typography.pxToRem(24),
                        '&:hover': {
                            backgroundColor: "#0000FF",
                        },
                        fontSize: theme.typography.pxToRem(18),
                    })}
                    type="submit"
                    >
                        Checkout
                    </Button>
                </form>
                <Typography
                sx={(theme) => ({
                    marginTop: theme.typography.pxToRem(16),
                    fontWeight: 600
                })}
                >
                    * Please be advised that shipping costs are not included in the total purchase price. Shipping will be paid upon receiving your order.
                </Typography>
            </div>
            }
        </div>
    );
}

export default Cart;