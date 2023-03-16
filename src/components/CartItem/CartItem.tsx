import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.typography.pxToRem(24),
        width: `100%`,
        height: `auto`,         
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginRight: theme.typography.pxToRem(24),
        height: `100%`,
        width: `100%`,
    },
    priceContainer: {


    }
}));


const CartItem = ({ item }: {item: {id: number, price: number, title: string, size: string, image: string}}) => {

    const classes = useStyles();

    return ( 
        <div
        className={classes.itemContainer}
        >
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
                        [theme.breakpoints.up(420)]: {
                            marginBottom: theme.typography.pxToRem(8),
                        }
                    })}
                    >
                        {item.size}
                    </Typography>
                </div>
                <div
                className={classes.priceContainer}
                >
                    <Typography
                    sx={(theme) => ({
                        [theme.breakpoints.up(420)]: {
                            fontSize: theme.typography.pxToRem(18),
                            fontWeight: 600
                        }
                    })}
                    >
                        ${item.price.toFixed(2)}
                    </Typography>
                </div>
            </div>
        </div>
    );
}
 
export default CartItem;