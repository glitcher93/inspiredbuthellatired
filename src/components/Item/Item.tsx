import { Button, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

const Item = ({ item }: {item: {id: number, price: number, title: string, size: string, image: string}}) => {

    const classes = useStyles();

    return (
        <Grid 
        item 
        sm={12} 
        md={4} 
        lg={3} 
        key={item.id}
        sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        })}
        >
            <img 
            src={item.image} 
            alt="test"
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
                ${item.price.toFixed(2)}
            </Typography>
            <Button
            sx={(theme) => ({
                backgroundColor: "#0000BB",
                color: "#FFF",
                padding: 1,
                '&:hover': {
                    backgroundColor: "#0000FF",
                },
            })}
            >
                Add to cart
            </Button>
        </Grid>
    );
}
 
export default Item;