import { Theme } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { makeStyles } from "@mui/styles";
import { ICartItem } from "../../utils/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
    item: {
        margin: `${theme.typography.pxToRem(8)} 0`,
        display: "flex",
        width: "100%",
    },
    imageContainer: {

    },
    image: {
        width: `${theme.typography.pxToRem(125)}`,
        height: `${theme.typography.pxToRem(125)}`,
        objectFit: "cover",
        [theme.breakpoints.up(500)]: {
            width: `100%`,
        }
    },
    itemInfo: {
        marginLeft: theme.typography.pxToRem(16),
    }
}))

const SummaryItem = ({item}: {item: ICartItem}) => {

    const classes = useStyles();

    return (
        <div
        className={classes.item}
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
            className={classes.itemInfo}
            >
                <Typography>
                    {item.title}
                </Typography>
                <Typography>
                    {item.size}
                </Typography>
                <Typography>
                    QTY: {item.quantity}
                </Typography>
                <Typography>
                    ${(Number(item.priceInCents) * item.quantity! / 100).toFixed(2)}
                </Typography>
            </div>
            
        </div>
    );
}
 
export default SummaryItem;