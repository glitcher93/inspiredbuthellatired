import { Button, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/Cart/cartSlice";
import { AppDispatch, ICartItem, IProductProps } from "../../utils/interfaces";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme: Theme) => ({
    image: {
        width: "50%",
        height: `100%`,
        objectFit: "cover",
        [theme.breakpoints.up('md')]: {
            width: "100%",
        }
    }
}))

const Item = ({ item }: IProductProps) => {

    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();

    const addCartItem = (item: ICartItem) => {
        dispatch(addToCart(item));
        Swal.fire({
            icon: 'success',
            title: 'Item added to cart',
            timer: 2000,
            showConfirmButton: false,
            position: 'bottom-left'
        });
    }

    return (
        <Grid 
        item 
        sm={12} 
        md={4} 
        lg={3}
        sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "fit-content",
            textAlign: "center"
        })}
        >
            <img 
            src={item.image} 
            alt={item.title}
            className={classes.image} 
            />
            <Typography
            variant="h3"
            sx={(theme) => ({
                fontFamily: "Nunito Sans",
                fontSize: theme.typography.pxToRem(22),
                margin: `${theme.typography.pxToRem(8)} 0 0`,
            })}
            >
                {item.title}
            </Typography>
            <Typography
            sx={(theme) => ({
                fontFamily: "Nunito Sans",
                fontSize: theme.typography.pxToRem(18),
                margin: `${theme.typography.pxToRem(4)} 0 0`,
                fontWeight: 400,
            })}
            >
                {item.size}
            </Typography>
            <Typography
            sx={(theme) => ({
                fontFamily: "Nunito Sans",
                fontSize: theme.typography.pxToRem(18),
                margin: `${theme.typography.pxToRem(4)} 0`,
                fontWeight: 400,
            })}
            >
                ${Number(item.priceInCents / 100).toFixed(2)}
            </Typography>
            <Button
            sx={(theme) => ({
                backgroundColor: "#0000BB",
                color: "#FFF",
                padding: 1,
                transition: 'background-color 0.3s',
                '&:hover': {
                    backgroundColor: "#0000FF",
                },
            })}
            onClick={() => addCartItem(item)}
            >
                Add to cart
            </Button>
        </Grid>
    );
}

export default Item;