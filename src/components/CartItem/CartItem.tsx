import { Add, Close, Remove } from "@mui/icons-material";
import { IconButton, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../features/Cart/cartSlice";
import { AppDispatch, ICartItem } from "../../utils/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.typography.pxToRem(24),
        width: `100%`,
        height: `auto`,
        border: `1px solid ${theme.palette.grey[300]}`,
        padding: theme.typography.pxToRem(8),
        position: 'relative',         
    },
    imageContainer: {
        width: `33%`,
        [theme.breakpoints.up(420)]: {
            marginRight: theme.typography.pxToRem(24),
        },
        [theme.breakpoints.up('md')]: {
            width: `auto`
        }
    },
    image: {
        width: `${theme.typography.pxToRem(75)}`,
        height: "fit-content",
        [theme.breakpoints.up(420)]: {
            width: `100%`,
            marginRight: theme.typography.pxToRem(24),
        },
        [theme.breakpoints.up('md')]: {
            margin: 0,
            width: `${theme.typography.pxToRem(100)}`
        }
    },
    textContainer: {
        width: `66%`,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up(420)]: {
            width: `66%`,
            height: `100%`,
            justifyContent: 'space-between',
        },
        [theme.breakpoints.up('md')]: {
            width: `100%`
        }
    },
    itemText: {
        marginRight: theme.typography.pxToRem(24),
        height: `100%`,
        width: `100%`,
        [theme.breakpoints.up(550)]: {
            display: 'flex',
        }
    },
    quantityContainer: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up(550)]: {
            width: `50%`,
        }
    },
    itemInfo: {
        [theme.breakpoints.up(550)]: {
            width: `50%`,
        }
    }
}));


const CartItem = ({ item }: {item: ICartItem}) => {

    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();

    const removeItem = (cartItem: ICartItem) => {
        dispatch(removeFromCart(cartItem));
    }

    const increment = (cartItem: ICartItem) => {
        dispatch(incrementQuantity(cartItem));
    };

    const decrement = (cartItem: ICartItem) => {
        dispatch(decrementQuantity(cartItem));
    };

    return ( 
        <div
        className={classes.itemContainer}
        >
            <IconButton
            sx={(theme) => ({
                padding: 0,
                position: 'absolute',
                top: '4px',
                right: '4px',
            })}
            onClick={() => removeItem(item)}
            >
                <Close />
            </IconButton>
            <div
            className={classes.imageContainer}
            >
                <img 
                src={item.image} 
                alt={item.title}
                className={classes.image} 
                />
            </div>
            <div
            className={classes.textContainer}
            >
                <div
                className={classes.itemText}
                >
                    <div
                    className={classes.itemInfo}
                    >
                        <Typography
                        sx={(theme) => ({
                            [theme.breakpoints.up(420)]: {
                                fontSize: theme.typography.pxToRem(18),
                                fontWeight: 600,
                                marginBottom: theme.typography.pxToRem(8),
                            }
                        })}
                        >
                            {item.title}
                        </Typography>
                        <Typography
                        sx={(theme) => ({
                            fontSize: theme.typography.pxToRem(14),
                            [theme.breakpoints.up(420)]: {
                                marginBottom: theme.typography.pxToRem(8),
                            }
                        })}
                        >
                            {item.size}
                        </Typography>
                    </div>
                    {item.type === "Print" &&
                    <div
                    className={classes.quantityContainer}
                    >
                        <IconButton
                        onClick={() => decrement(item)}
                        sx={(theme) => ({
                            paddingX: 0,
                        })}
                        >
                            <Remove 
                            sx={(theme) => ({
                            fontSize: theme.typography.pxToRem(14),
                            marginRight: theme.typography.pxToRem(8),
                            [theme.breakpoints.up(550)]: {
                                fontSize: theme.typography.pxToRem(18),
                                marginRight: theme.typography.pxToRem(8),
                            }
                            })}
                            />
                        </IconButton>
                        <Typography
                        sx={(theme) => ({
                            fontSize: theme.typography.pxToRem(14),
                            fontWeight: 600,
                            [theme.breakpoints.up(550)]: {
                                fontSize: theme.typography.pxToRem(18),
                            }
                        })}
                        >
                            {item.quantity}
                        </Typography>
                        <IconButton
                        onClick={() => increment(item)}
                        sx={(theme) => ({
                            paddingX: 0,
                        })}
                        >
                            <Add 
                            sx={(theme) => ({
                            fontSize: theme.typography.pxToRem(14),
                            marginLeft: theme.typography.pxToRem(8),
                            [theme.breakpoints.up(550)]: {
                                fontSize: theme.typography.pxToRem(18),
                                marginLeft: theme.typography.pxToRem(8),
                            }
                            })}
                            />
                        </IconButton>
                    </div>
                    }
                </div>
                <div>
                    <Typography
                    sx={(theme) => ({
                        [theme.breakpoints.up(420)]: {
                            fontSize: theme.typography.pxToRem(18),
                            fontWeight: 600
                        }
                    })}
                    >
                        ${((Number(item.priceInCents) / 100) * item.quantity!).toFixed(2)}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default CartItem;